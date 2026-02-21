import { type DragEvent, type FormEvent, useMemo, useRef, useState } from 'react';
import { LogOut, Pencil, Trash2, UploadCloud, X } from 'lucide-react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '@/app/lib/firebase';
import { useProducts } from '@/app/hooks/useProducts';
import { useAdminAuth } from '@/app/hooks/useAdminAuth';
import { Product } from '@/data/products';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/app/components/ui/alert-dialog';

type ProductFormState = {
  id: string;
  name: string;
  slug: string;
  description: string;
  completePrice: string;
  deckOnlyPrice: string;
  image: string;
  images: string[];
  camber: string;
  concave: string;
  wheelbase: string;
  trucks: string;
  wheels: string;
  bearings: string;
  features: string;
};

const emptyFormState: ProductFormState = {
  id: '',
  name: '',
  slug: '',
  description: '',
  completePrice: '',
  deckOnlyPrice: '',
  image: '',
  images: [],
  camber: '',
  concave: '',
  wheelbase: '',
  trucks: '',
  wheels: '',
  bearings: '',
  features: '',
};

const toSlug = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

export default function AdminPage() {
  const { user, loading, error, isAdmin, signIn, signOutUser, bootstrapAdmin, storeId } = useAdminAuth();
  const {
    products,
    loading: productsLoading,
    error: productsError,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();
  const [tabValue, setTabValue] = useState('products');
  const [formState, setFormState] = useState<ProductFormState>(emptyFormState);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authSubmitting, setAuthSubmitting] = useState(false);
  const [authMessage, setAuthMessage] = useState<string | null>(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imageUploading, setImageUploading] = useState(false);

  const isEditing = Boolean(formState.id);

  const handleEdit = (product: Product) => {
    setFormState({
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      completePrice: String(product.completePrice),
      deckOnlyPrice: String(product.deckOnlyPrice),
      image: product.image,
      images: product.images?.length ? product.images : [product.image].filter(Boolean),
      camber: product.specs.camber,
      concave: product.specs.concave,
      wheelbase: product.specs.wheelbase,
      trucks: product.components.trucks ?? '',
      wheels: product.components.wheels,
      bearings: product.components.bearings,
      features: product.features.join('\n'),
    });
    setImagePreviews(product.images?.length ? product.images : [product.image].filter(Boolean));
    setTabValue('add');
  };

  const handleDelete = async (id: string) => {
    setFormMessage(null);
    try {
      await deleteProduct(id);
    } catch {
      setFormMessage('Unable to delete product.');
    }
  };

  const handleReset = () => {
    setFormState(emptyFormState);
    setImagePreviews([]);
    setFormMessage(null);
  };

  const uploadImage = async (file: File) => {
    if (!storeId || !user) {
      throw new Error('Missing store or user.');
    }
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
    const storageRef = ref(
      storage,
      `stores/${storeId}/uploads/products/${user.uid}/${Date.now()}-${safeName}`,
    );
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };

  const handleFileSelect = async (files?: FileList | File[] | null) => {
    if (!files || files.length === 0) return;
    setFormMessage(null);
    setImageUploading(true);
    const fileArray = Array.from(files);
    const previewUrls = fileArray.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...previewUrls]);

    try {
      const uploadedUrls = await Promise.all(fileArray.map((file) => uploadImage(file)));
      setFormState((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls],
        image: prev.image || uploadedUrls[0] || '',
      }));
      setImagePreviews((prev) => [
        ...prev.slice(0, Math.max(0, prev.length - previewUrls.length)),
        ...uploadedUrls,
      ]);
    } catch {
      setFormMessage('Image upload failed. Please try again.');
      setImagePreviews((prev) => prev.slice(0, Math.max(0, prev.length - previewUrls.length)));
    } finally {
      setImageUploading(false);
    }
  };

  const handleDrop = async (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;
    await handleFileSelect(files);
  };

  const handleRemoveImage = (index: number) => {
    setFormState((prev) => {
      const nextImages = prev.images.filter((_, itemIndex) => itemIndex !== index);
      return {
        ...prev,
        images: nextImages,
        image: nextImages[0] || '',
      };
    });
    setImagePreviews((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (imageUploading) {
      setFormMessage('Wait for image uploads to finish.');
      return;
    }
    setFormSubmitting(true);
    setFormMessage(null);
    const slugValue = formState.slug.trim() || toSlug(formState.name);
    const features = formState.features
      .split(/[\n,]/)
      .map((item) => item.trim())
      .filter(Boolean);
    const productPayload: Omit<Product, 'id'> = {
      name: formState.name.trim(),
      slug: slugValue,
      description: formState.description.trim(),
      completePrice: Number(formState.completePrice) || 0,
      deckOnlyPrice: Number(formState.deckOnlyPrice) || 0,
      image: formState.images[0] || formState.image,
      images: formState.images.length ? formState.images : formState.image ? [formState.image] : [],
      specs: {
        camber: formState.camber.trim(),
        concave: formState.concave.trim(),
        wheelbase: formState.wheelbase.trim(),
      },
      components: {
        ...(formState.trucks.trim() ? { trucks: formState.trucks.trim() } : {}),
        wheels: formState.wheels.trim(),
        bearings: formState.bearings.trim(),
      },
      features,
    };

    try {
      if (isEditing) {
        await updateProduct(formState.id, productPayload);
      } else {
        await addProduct(productPayload);
      }
      handleReset();
      setTabValue('products');
    } catch {
      setFormMessage('Unable to save product. Please try again.');
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAuthSubmitting(true);
    setAuthMessage(null);
    try {
      await signIn(authEmail, authPassword);
    } catch {
      setAuthMessage('Login failed. Please verify your credentials.');
    } finally {
      setAuthSubmitting(false);
    }
  };

  const handleBootstrap = async () => {
    setAuthSubmitting(true);
    setAuthMessage(null);
    try {
      await bootstrapAdmin();
    } catch {
      setAuthMessage('Unable to activate admin access.');
    } finally {
      setAuthSubmitting(false);
    }
  };

  const productRows = useMemo(() => {
    if (productsLoading) {
      return (
        <TableRow>
          <TableCell colSpan={6} className="text-center text-gray-500">
            Loading products...
          </TableCell>
        </TableRow>
      );
    }

    if (productsError) {
      return (
        <TableRow>
          <TableCell colSpan={6} className="text-center text-red-600">
            {productsError}
          </TableCell>
        </TableRow>
      );
    }

    if (products.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={6} className="text-center text-gray-500">
            No products yet.
          </TableCell>
        </TableRow>
      );
    }

    return products.map((product) => (
      <TableRow key={product.id}>
        <TableCell className="font-semibold">{product.name}</TableCell>
        <TableCell>{product.slug}</TableCell>
        <TableCell>${product.completePrice.toFixed(2)}</TableCell>
        <TableCell>${product.deckOnlyPrice.toFixed(2)}</TableCell>
          <TableCell>
            <div className="h-12 w-16 overflow-hidden rounded-md bg-gray-100">
              <ImageWithFallback
                src={product.images?.[0] || product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
          </TableCell>
        <TableCell className="text-right">
          <div className="flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-[#0C5A7D]"
              onClick={() => handleEdit(product)}
              aria-label={`Edit ${product.name}`}
            >
              <Pencil className="h-4 w-4" />
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-red-600 hover:text-red-700"
                  aria-label={`Delete ${product.name}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete product?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action removes the product from the storefront.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDelete(product.id)}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </TableCell>
      </TableRow>
    ));
  }, [products, productsLoading, productsError]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-lg text-gray-600">Checking admin access...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle className="text-2xl" style={{ fontFamily: 'Merriweather, serif' }}>
              Admin Login
            </CardTitle>
            <CardDescription>Sign in with your admin credentials to manage products.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleLogin}>
              <div className="space-y-2">
                <Label htmlFor="admin-email">Email</Label>
                <Input
                  id="admin-email"
                  type="email"
                  value={authEmail}
                  onChange={(event) => setAuthEmail(event.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-password">Password</Label>
                <Input
                  id="admin-password"
                  type="password"
                  value={authPassword}
                  onChange={(event) => setAuthPassword(event.target.value)}
                  required
                />
              </div>
              {(authMessage || error) && (
                <div className="text-sm text-red-600">{authMessage || error}</div>
              )}
              <Button type="submit" className="w-full bg-[#0C5A7D] text-white hover:bg-[#0A4359]" disabled={authSubmitting}>
                {authSubmitting ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-xl">
          <CardHeader>
            <CardTitle className="text-2xl" style={{ fontFamily: 'Merriweather, serif' }}>
              Admin Access Required
            </CardTitle>
            <CardDescription>
              Your account is signed in but does not have admin permissions for this store.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-gray-600">Store: {storeId || 'Missing store ID'}</div>
            {(authMessage || error) && (
              <div className="text-sm text-red-600">{authMessage || error}</div>
            )}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                type="button"
                className="bg-[#0C5A7D] text-white hover:bg-[#0A4359]"
                onClick={handleBootstrap}
                disabled={authSubmitting || !storeId}
              >
                {authSubmitting ? 'Activating...' : 'Activate Admin Access'}
              </Button>
              <Button type="button" variant="outline" onClick={signOutUser}>
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between mb-12">
          <div className="text-center md:text-left">
            <h1 className="text-5xl mb-4" style={{ fontFamily: 'Merriweather, serif' }}>
              Admin
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl">
              Manage products with the same handcrafted feel as the storefront.
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="self-center md:self-start text-[#0C5A7D]"
            aria-label="Log out"
            onClick={signOutUser}
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-10">
          <Tabs value={tabValue} onValueChange={setTabValue} className="gap-6">
            <TabsList className="self-start">
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="add">{isEditing ? 'Update Product' : 'Add Product'}</TabsTrigger>
            </TabsList>

            <TabsContent value="products">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Complete</TableHead>
                    <TableHead>Deck Only</TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>{productRows}</TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="add">
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      value={formState.name}
                      onChange={(event) =>
                        setFormState((prev) => ({
                          ...prev,
                          name: event.target.value,
                          slug: prev.slug ? prev.slug : toSlug(event.target.value),
                        }))
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      value={formState.slug}
                      onChange={(event) =>
                        setFormState((prev) => ({ ...prev, slug: event.target.value }))
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    className="min-h-[120px]"
                    value={formState.description}
                    onChange={(event) =>
                      setFormState((prev) => ({ ...prev, description: event.target.value }))
                    }
                    required
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="completePrice">Complete Price</Label>
                    <Input
                      id="completePrice"
                      type="number"
                      step="0.01"
                      value={formState.completePrice}
                      onChange={(event) =>
                        setFormState((prev) => ({ ...prev, completePrice: event.target.value }))
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deckOnlyPrice">Deck Only Price</Label>
                    <Input
                      id="deckOnlyPrice"
                      type="number"
                      step="0.01"
                      value={formState.deckOnlyPrice}
                      onChange={(event) =>
                        setFormState((prev) => ({ ...prev, deckOnlyPrice: event.target.value }))
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Product Images</Label>
                  <div
                    className={`rounded-xl border-2 border-dashed p-6 text-center transition ${
                      isDragging ? 'border-[#0C5A7D] bg-[#0C5A7D]/5' : 'border-gray-200'
                    }`}
                    onDragOver={(event) => {
                      event.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="flex flex-col items-center gap-3 text-gray-600">
                      <UploadCloud className="h-8 w-8 text-[#0C5A7D]" />
                      <div>
                        <p className="font-semibold">Drag and drop or click to upload</p>
                        <p className="text-sm text-gray-500">PNG, JPG, or JPEG</p>
                      </div>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(event) => handleFileSelect(event.target.files)}
                    />
                  </div>
                  {imageUploading && (
                    <div className="text-sm text-gray-500">Uploading images...</div>
                  )}
                  {imagePreviews.length > 0 && (
                    <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {imagePreviews.map((image, index) => (
                        <div key={`${image}-${index}`} className="relative rounded-lg overflow-hidden border border-gray-200">
                          <ImageWithFallback
                            src={image}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-40 object-cover"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 bg-white/80 hover:bg-white text-gray-700"
                            aria-label="Remove image"
                            onClick={() => handleRemoveImage(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="camber">Camber</Label>
                    <Input
                      id="camber"
                      value={formState.camber}
                      onChange={(event) =>
                        setFormState((prev) => ({ ...prev, camber: event.target.value }))
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="concave">Concave</Label>
                    <Input
                      id="concave"
                      value={formState.concave}
                      onChange={(event) =>
                        setFormState((prev) => ({ ...prev, concave: event.target.value }))
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="wheelbase">Wheelbase</Label>
                    <Input
                      id="wheelbase"
                      value={formState.wheelbase}
                      onChange={(event) =>
                        setFormState((prev) => ({ ...prev, wheelbase: event.target.value }))
                      }
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="trucks">Trucks</Label>
                    <Input
                      id="trucks"
                      value={formState.trucks}
                      onChange={(event) =>
                        setFormState((prev) => ({ ...prev, trucks: event.target.value }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="wheels">Wheels</Label>
                    <Input
                      id="wheels"
                      value={formState.wheels}
                      onChange={(event) =>
                        setFormState((prev) => ({ ...prev, wheels: event.target.value }))
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bearings">Bearings</Label>
                    <Input
                      id="bearings"
                      value={formState.bearings}
                      onChange={(event) =>
                        setFormState((prev) => ({ ...prev, bearings: event.target.value }))
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="features">Features</Label>
                  <Textarea
                    id="features"
                    value={formState.features}
                    onChange={(event) =>
                      setFormState((prev) => ({ ...prev, features: event.target.value }))
                    }
                    placeholder="Enter one feature per line or separate with commas"
                    className="min-h-[120px]"
                    required
                  />
                </div>

                {formMessage && <div className="text-sm text-red-600">{formMessage}</div>}
                <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                  <Button type="button" variant="outline" onClick={handleReset}>
                    Clear Form
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[#0C5A7D] text-white hover:bg-[#0A4359]"
                    disabled={formSubmitting || imageUploading}
                  >
                    {formSubmitting
                      ? 'Saving...'
                      : isEditing
                        ? 'Update Product'
                        : 'Add Product'}
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

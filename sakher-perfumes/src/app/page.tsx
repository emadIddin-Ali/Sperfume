import { supabase, Product } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';
import Header from '@/components/Header';

async function getProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('active', true)
      .order('name');

    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-20">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-text-primary mb-6">
            Luxury Perfumes
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Discover our exquisite collection of fine fragrances, crafted with the finest ingredients 
            to create unforgettable moments.
          </p>
          <a
            href="#products"
            className="inline-block bg-primary hover:bg-primary-hover text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200"
          >
            Shop Now
          </a>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-text-primary mb-4">
              Our Collection
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our carefully curated selection of premium perfumes, each telling its own unique story.
            </p>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🌸</div>
              <h3 className="font-display text-xl font-semibold text-text-primary mb-2">
                No Products Available
              </h3>
              <p className="text-gray-600">
                Check back soon for our latest collection.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-text-primary mb-6">
              About Sakher Perfumes
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
              We are passionate about bringing you the finest fragrances from around the world. 
              Our collection features carefully selected perfumes that combine traditional craftsmanship 
              with modern sophistication, creating scents that become part of your personal story.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-text-primary mb-6">
              Get in Touch
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Have questions about our products? We'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:info@sakherperfumes.com"
                className="bg-primary hover:bg-primary-hover text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200"
              >
                Email Us
              </a>
              <a
                href="tel:+1234567890"
                className="border border-primary text-primary hover:bg-primary hover:text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200"
              >
                Call Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-text-primary text-white py-8">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 Sakher Perfumes. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

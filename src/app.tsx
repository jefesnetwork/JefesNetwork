import { useState } from 'react';
import {
  MessageCircle,
  Lock,
  Send,
  Phone,
  ShoppingBag,
  Leaf,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Product {
  name: string;
  description?: string;
  prices: { quantity: string; price: string }[];
  badge?: string;
  soldOut?: boolean;
}

interface Category {
  id: string;
  title: string;
  emoji: string;
  icon: React.ReactNode;
  products: Product[];
}

const shopData: Category[] = [
  {
    id: 'raucher',
    title: 'RAUCHER',
    emoji: '🌿',
    icon: <Leaf className="w-5 h-5" />,
    products: [
      {
        name: 'Top NL Hase',
        description: 'Top quality selection',
        prices: [{ quantity: 'Contact', price: 'DM for info' }],
        badge: 'Popular'
      },
      {
        name: 'Cali',
        description: 'US-Spanisches-Loose-Apotheke',
        prices: [{ quantity: 'Contact', price: 'DM for info' }]
      },
      {
        name: 'Hash',
        description: 'Mousse-Frozen-Dry-Static-Piatella',
        prices: [{ quantity: 'Contact', price: 'DM for info' }],
        badge: 'New'
      }
    ]
  },
  {
    id: 'medis',
    title: 'MEDIS',
    emoji: '✨',
    icon: <Sparkles className="w-5 h-5" />,
    products: [
      {
        name: 'Alprazolam 1mg',
        soldOut: true,
        prices: [
          { quantity: '10 pcs', price: '€30' },
          { quantity: '50 pcs', price: '€90' },
          { quantity: '250 pcs', price: '€350' }
        ]
      },
      {
        name: 'Pregabalin 300mg',
        soldOut: true,
        prices: [
          { quantity: '10 pcs', price: '€25' },
          { quantity: '50 pcs', price: '€80' },
          { quantity: '100 pcs', price: '€190' }
        ]
      },
      {
        name: 'Clonazepam 2mg',
        prices: [
          { quantity: '10 pcs', price: '€25' },
          { quantity: '50 pcs', price: '€80' },
          { quantity: '100 pcs', price: '€135' }
        ]
      },
      {
        name: 'Bromazepam 6mg',
        prices: [
          { quantity: '10 pcs', price: '€25' },
          { quantity: '30 pcs', price: '€80' },
          { quantity: '50 pcs', price: '€325' }
        ]
      }
    ]
  },
  {
    id: 'chemie',
    title: 'CHEMIE',
    emoji: '💎',
    icon: <ShoppingBag className="w-5 h-5" />,
    products: [
      {
        name: 'Colo/Boli Shem',
        prices: [
          { quantity: '1 unit', price: '€80' },
          { quantity: '3 units', price: '€190' },
          { quantity: '5 units', price: '€275' },
          { quantity: '10 units', price: '€450' }
        ]
      },
      {
        name: 'Ketamin',
        prices: [
          { quantity: '10 units', price: '€85' },
          { quantity: '50 units', price: '€250' },
          { quantity: '100 units', price: '€400' },
          { quantity: '200 units', price: '€700' },
          { quantity: '500 units', price: '€1.500' },
          { quantity: '1000 units', price: '€2.500' }
        ]
      },
      {
        name: '2CB',
        prices: [
          { quantity: '10 units', price: '€90' },
          { quantity: '50 units', price: '€300' },
          { quantity: '100 units', price: '€450' },
          { quantity: '200 units', price: '€750' }
        ]
      },
      {
        name: 'LSD 200–300ug',
        prices: [
          { quantity: '10 units', price: '€90' },
          { quantity: '50 units', price: '€300' },
          { quantity: '100 units', price: '€450' },
          { quantity: '200 units', price: '€750' }
        ],
        badge: 'Premium'
      }
    ]
  }
];

const contactLinks = [
  {
    name: 'THREEMA ID',
    icon: <Lock className="w-4 h-4" />,
    url: 'https://threema.id/835S56U3',
    color: 'bg-emerald-600 hover:bg-emerald-500'
  },
  {
    name: 'TELEGRAM',
    icon: <Send className="w-4 h-4" />,
    url: 'https://t.me/jefesnetzwerkinfo',
    color: 'bg-sky-600 hover:bg-sky-500'
  },
  {
    name: 'SIGNAL',
    icon: <Phone className="w-4 h-4" />,
    url: 'https://signal.me/#eu/...',
    color: 'bg-blue-600 hover:bg-blue-500'
  }
];

function ProductCard({ product }: { product: Product }) {
  return (
    <Card className={`bg-zinc-900/80 border-zinc-800 ${product.soldOut ? 'opacity-60' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-zinc-100">
            ‼️ {product.name} ‼️
          </CardTitle>

          {product.badge && (
            <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
              {product.badge}
            </Badge>
          )}

          {product.soldOut && (
            <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
              Sold Out
            </Badge>
          )}
        </div>

        {product.description && (
          <p className="text-sm text-zinc-500">{product.description}</p>
        )}
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {product.prices.map((price, idx) => (
            <div key={idx} className="bg-zinc-800/50 p-2 rounded-lg text-center">
              <div className="text-xs text-zinc-500">{price.quantity}</div>
              <div className="text-zinc-200 font-semibold">{price.price}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function CategorySection({ category }: { category: Category }) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="mb-8">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex justify-between items-center p-4 bg-zinc-900 rounded-xl border border-zinc-700"
      >
        <h2 className="text-xl font-bold">
          {category.emoji} {category.title} {category.emoji}
        </h2>
        {isExpanded ? <ChevronUp /> : <ChevronDown />}
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-4">
          {category.products.map((p, i) => (
            <ProductCard key={i} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6">
      {shopData.map((cat) => (
        <CategorySection key={cat.id} category={cat} />
      ))}
    </div>
  );
}

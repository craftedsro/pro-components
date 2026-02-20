# eShop Application Architecture

## Component Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                      ProCard (Main Container)                │
│  Title: "PC Notebook eShop"                                  │
│  Extra: Product Count + Cart Button                          │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              ProTable (Product Listing)                 │ │
│  ├────────────────────────────────────────────────────────┤ │
│  │ Search & Filter Bar                                     │ │
│  │  - Brand Filter                                         │ │
│  │  - Category Filter                                      │ │
│  ├────────────────────────────────────────────────────────┤ │
│  │ Table Columns:                                          │ │
│  │  ├─ Product Name (with icon)                           │ │
│  │  ├─ Brand                                               │ │
│  │  ├─ Processor                                           │ │
│  │  ├─ RAM                                                 │ │
│  │  ├─ Storage                                             │ │
│  │  ├─ Category (with status tags)                        │ │
│  │  ├─ Price (sortable)                                   │ │
│  │  ├─ Stock (color-coded tags)                           │ │
│  │  ├─ Rating                                              │ │
│  │  └─ Actions (View Details, Add to Cart)                │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│              Drawer: Product Details (Right Side)            │
├─────────────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────────────┐ │
│  │         ProDescriptions (Product Details)               │ │
│  ├────────────────────────────────────────────────────────┤ │
│  │  - Brand                                                │ │
│  │  - Processor                                            │ │
│  │  - RAM                                                  │ │
│  │  - Storage                                              │ │
│  │  - Display                                              │ │
│  │  - Graphics                                             │ │
│  │  - Category                                             │ │
│  │  - Price                                                │ │
│  │  - Stock                                                │ │
│  │  - Rating                                               │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │         [Add to Cart - $XXX] (Button)                   │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│              Drawer: Shopping Cart (Right Side)              │
├─────────────────────────────────────────────────────────────┤
│  Header: Shopping Cart (X items)                            │
├─────────────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────────────┐ │
│  │              List (Cart Items)                          │ │
│  ├────────────────────────────────────────────────────────┤ │
│  │  For each item:                                         │ │
│  │  ├─ Product Name                                        │ │
│  │  ├─ Brand                                               │ │
│  │  ├─ Quantity × Price                                    │ │
│  │  ├─ Subtotal                                            │ │
│  │  └─ [Remove] Button                                     │ │
│  └────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  Footer:                                                     │
│  ├─ Total Amount (Statistic)                               │ │
│  └─ [Proceed to Checkout] Button                           │ │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                Drawer: Checkout (Right Side)                 │
├─────────────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────────────┐ │
│  │              ProForm (Checkout Form)                    │ │
│  ├────────────────────────────────────────────────────────┤ │
│  │                                                          │ │
│  │  ProCard: Shipping Information                          │ │
│  │  ├─ Full Name                                           │ │
│  │  ├─ Email                                               │ │
│  │  ├─ Phone                                               │ │
│  │  ├─ Shipping Address (TextArea)                        │ │
│  │  ├─ Country (Select)                                    │ │
│  │  └─ Zip Code                                            │ │
│  │                                                          │ │
│  │  ProCard: Payment Information                           │ │
│  │  ├─ Card Number                                         │ │
│  │  ├─ Card Holder Name                                    │ │
│  │  ├─ Expiry Date                                         │ │
│  │  └─ CVV                                                 │ │
│  │                                                          │ │
│  │  ProCard: Order Summary                                 │ │
│  │  └─ List of Cart Items with Prices                     │ │
│  │                                                          │ │
│  │  Footer:                                                │ │
│  │  ├─ Order Total (Statistic)                            │ │
│  │  └─ [Place Order] Button                               │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

```
User Actions:
  │
  ├─> View Product Listing
  │    └─> ProTable displays all products
  │         ├─> Filter by Brand
  │         ├─> Filter by Category
  │         └─> Sort by Price/Rating
  │
  ├─> View Product Details
  │    └─> Click on product name
  │         └─> Opens Product Details Drawer
  │              └─> ProDescriptions shows specs
  │
  ├─> Add to Cart
  │    └─> Click "Add to Cart" button
  │         └─> Updates cart state
  │              ├─> Shows success message
  │              └─> Updates cart badge count
  │
  ├─> View Cart
  │    └─> Click cart button
  │         └─> Opens Shopping Cart Drawer
  │              ├─> Shows all cart items
  │              ├─> Displays total amount
  │              └─> Option to remove items
  │
  └─> Checkout
       └─> Click "Proceed to Checkout"
            └─> Opens Checkout Drawer
                 ├─> Fill shipping information
                 ├─> Enter payment details
                 ├─> Review order summary
                 └─> Place order
                      ├─> Form validation
                      ├─> Success message
                      └─> Clear cart
```

## State Management

```typescript
State Variables:
├─ selectedProduct: NotebookProduct | null
│   └─ Stores currently selected product for details view
│
├─ detailsVisible: boolean
│   └─ Controls Product Details Drawer visibility
│
├─ cartVisible: boolean
│   └─ Controls Shopping Cart Drawer visibility
│
├─ checkoutVisible: boolean
│   └─ Controls Checkout Drawer visibility
│
└─ cart: CartItem[]
    └─ Stores all items in shopping cart
        └─ CartItem { product, quantity }
```

## Key Features Implementation

### 1. Product Filtering
- ProTable's built-in filter system
- ValueEnum for brand and category filters
- Custom onFilter logic

### 2. Shopping Cart Logic
```typescript
addToCart(product) {
  - Check if product exists in cart
  - If yes: increment quantity
  - If no: add new item with quantity 1
  - Show success message
}

removeFromCart(productId) {
  - Filter out product from cart
  - Update cart state
}

calculateTotal() {
  - Reduce cart items
  - Sum (price × quantity) for all items
}
```

### 3. Form Validation
- Required field validation
- Email format validation
- Custom validation rules
- Form submission handling

### 4. User Feedback
- Success messages for cart operations
- Disabled states for out-of-stock items
- Color-coded stock indicators
- Badge count for cart items

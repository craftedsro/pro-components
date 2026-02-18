# eShop - PC Notebook Store

## Overview

This is a complete e-commerce demo application built with ProComponents, showcasing a fully functional online store for selling PC notebooks. This demo demonstrates how to build enterprise-level e-commerce applications using ProComponents library.

## Features

### 1. Product Catalog
- **Product Listing Table**: Display all available notebook products with comprehensive details
- **Advanced Search & Filter**: Search by brand, category, and other attributes
- **Sorting**: Sort products by price, rating, and other criteria
- **Stock Management**: Real-time stock level indicators with color-coded tags

### 2. Product Details
- **Detailed View**: Comprehensive product specifications displayed using ProDescriptions
- **Specifications**: Full technical details including processor, RAM, storage, display, and graphics
- **Category Tags**: Visual categorization (Budget, Premium, Gaming, Business, Creator, Ultra-portable)
- **Rating System**: Product ratings displayed with star indicators

### 3. Shopping Cart
- **Real-time Cart**: Live shopping cart with item count badge
- **Cart Management**: Add/remove products with quantity tracking
- **Price Calculation**: Automatic subtotal and total calculation
- **Persistent Cart**: Cart state maintained during browsing session

### 4. Checkout Process
- **Multi-section Form**: Organized checkout with shipping and payment sections
- **Form Validation**: Built-in validation for all required fields
- **Order Summary**: Complete order review before purchase
- **Professional Layout**: Clean, user-friendly checkout experience

## Technologies Used

### ProComponents
- **ProTable**: For product listing with search and filter capabilities
- **ProDescriptions**: For displaying detailed product information
- **ProForm**: For the checkout form with validation
- **ProCard**: For organizing page layout and sections
- **ProFormText**: For text input fields
- **ProFormSelect**: For dropdown selections
- **ProFormTextArea**: For address input

### Ant Design Components
- **Button**: For actions throughout the application
- **Drawer**: For cart and product details slides
- **Badge**: For cart item count
- **Tag**: For status indicators
- **Statistic**: For displaying metrics
- **List**: For cart items
- **Space**: For layout spacing
- **Message**: For user feedback

## Product Data

The demo includes 8 sample notebook products featuring:
- Dell XPS 15
- HP Pavilion 14
- Lenovo ThinkPad X1
- ASUS ROG Strix
- Acer Aspire 5
- MacBook Pro 16
- MSI Creator Z16
- Samsung Galaxy Book3

Each product includes:
- Brand and model name
- Processor specifications
- RAM and storage details
- Display specifications
- Graphics card information
- Price
- Stock availability
- Category
- Rating

## Usage

This demo can be accessed through the ProComponents playground at:
`/playground/eshop`

## File Structure

```
packages/table/src/demos/eshop.tsx    # Main application component
docs/playground/eshop.md               # Chinese documentation
docs/playground/eshop.en-US.md         # English documentation
```

## Implementation Details

### State Management
The application uses React hooks for state management:
- `useState` for cart items, drawer visibility, and selected products
- `useRef` for form reference

### Key Functions
- `addToCart()`: Adds products to cart with quantity management
- `removeFromCart()`: Removes items from cart
- `calculateTotal()`: Computes total cart value

### User Experience
- Responsive design with scroll support for tables
- Visual feedback with messages for user actions
- Disabled states for out-of-stock products
- Color-coded stock indicators
- Professional checkout flow

## Future Enhancements

Potential improvements for this demo:
- Add product images
- Implement order confirmation page
- Add product reviews and ratings
- Include product comparison feature
- Add wishlist functionality
- Implement user authentication
- Add payment gateway integration
- Include order history
- Add promotional codes/discounts
- Implement inventory real-time updates

## Learning Points

This demo teaches:
1. How to build complex tables with ProTable
2. Form handling with ProForm
3. State management in e-commerce applications
4. Cart functionality implementation
5. Multi-step checkout processes
6. Data validation and user feedback
7. Responsive drawer components
8. Professional UI/UX patterns

## License

MIT

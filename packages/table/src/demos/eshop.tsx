import { ShoppingCartOutlined, LaptopOutlined, DollarOutlined } from '@ant-design/icons';
import type { ProColumns, ProFormInstance } from '@ant-design/pro-components';
import {
  ProCard,
  ProDescriptions,
  ProTable,
  ProForm,
  ProFormText,
  ProFormSelect,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Button, message, Space, Tag, Badge, Statistic, Drawer, List } from 'antd';
import { useRef, useState } from 'react';

// Product data type for PC notebooks
type NotebookProduct = {
  id: number;
  name: string;
  brand: string;
  processor: string;
  ram: string;
  storage: string;
  display: string;
  graphics: string;
  price: number;
  stock: number;
  category: string;
  rating: number;
  image: string;
};

// Shopping cart item type
type CartItem = {
  product: NotebookProduct;
  quantity: number;
};

// Mock data for PC notebooks
const notebookData: NotebookProduct[] = [
  {
    id: 1,
    name: 'Dell XPS 15',
    brand: 'Dell',
    processor: 'Intel Core i7-12700H',
    ram: '16GB DDR5',
    storage: '512GB SSD',
    display: '15.6" FHD',
    graphics: 'NVIDIA RTX 3050',
    price: 1299,
    stock: 15,
    category: 'Premium',
    rating: 4.5,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: 'HP Pavilion 14',
    brand: 'HP',
    processor: 'Intel Core i5-1235U',
    ram: '8GB DDR4',
    storage: '256GB SSD',
    display: '14" HD',
    graphics: 'Intel Iris Xe',
    price: 699,
    stock: 25,
    category: 'Budget',
    rating: 4.0,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    name: 'Lenovo ThinkPad X1',
    brand: 'Lenovo',
    processor: 'Intel Core i7-1260P',
    ram: '16GB DDR4',
    storage: '1TB SSD',
    display: '14" 2K',
    graphics: 'Intel Iris Xe',
    price: 1599,
    stock: 10,
    category: 'Business',
    rating: 4.8,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 4,
    name: 'ASUS ROG Strix',
    brand: 'ASUS',
    processor: 'AMD Ryzen 9 6900HX',
    ram: '32GB DDR5',
    storage: '1TB SSD',
    display: '17.3" QHD 165Hz',
    graphics: 'NVIDIA RTX 3070 Ti',
    price: 2299,
    stock: 8,
    category: 'Gaming',
    rating: 4.7,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 5,
    name: 'Acer Aspire 5',
    brand: 'Acer',
    processor: 'Intel Core i5-1135G7',
    ram: '8GB DDR4',
    storage: '512GB SSD',
    display: '15.6" FHD',
    graphics: 'Intel Iris Xe',
    price: 599,
    stock: 30,
    category: 'Budget',
    rating: 3.8,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 6,
    name: 'MacBook Pro 16',
    brand: 'Apple',
    processor: 'Apple M2 Pro',
    ram: '16GB Unified',
    storage: '512GB SSD',
    display: '16.2" Retina',
    graphics: 'Apple M2 Pro GPU',
    price: 2499,
    stock: 12,
    category: 'Premium',
    rating: 4.9,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 7,
    name: 'MSI Creator Z16',
    brand: 'MSI',
    processor: 'Intel Core i7-12700H',
    ram: '32GB DDR5',
    storage: '1TB SSD',
    display: '16" QHD+ Touch',
    graphics: 'NVIDIA RTX 3060',
    price: 1899,
    stock: 6,
    category: 'Creator',
    rating: 4.4,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 8,
    name: 'Samsung Galaxy Book3',
    brand: 'Samsung',
    processor: 'Intel Core i5-1335U',
    ram: '8GB DDR4',
    storage: '256GB SSD',
    display: '15.6" FHD AMOLED',
    graphics: 'Intel Iris Xe',
    price: 849,
    stock: 20,
    category: 'Ultra-portable',
    rating: 4.2,
    image: 'https://via.placeholder.com/150',
  },
];

export default () => {
  const [selectedProduct, setSelectedProduct] = useState<NotebookProduct | null>(null);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);
  const [checkoutVisible, setCheckoutVisible] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const formRef = useRef<ProFormInstance>();

  // Add product to cart
  const addToCart = (product: NotebookProduct) => {
    const existingItem = cart.find((item) => item.product.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      );
      message.success(`Added another ${product.name} to cart`);
    } else {
      setCart([...cart, { product, quantity: 1 }]);
      message.success(`${product.name} added to cart`);
    }
  };

  // Remove product from cart
  const removeFromCart = (productId: number) => {
    setCart(cart.filter((item) => item.product.id !== productId));
    message.info('Product removed from cart');
  };

  // Calculate total
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  // Table columns
  const columns: ProColumns<NotebookProduct>[] = [
    {
      title: 'Product',
      dataIndex: 'name',
      copyable: true,
      ellipsis: true,
      fixed: 'left',
      width: 200,
      render: (_, record) => (
        <Space>
          <LaptopOutlined style={{ fontSize: 20, color: '#1890ff' }} />
          <a
            onClick={() => {
              setSelectedProduct(record);
              setDetailsVisible(true);
            }}
          >
            {record.name}
          </a>
        </Space>
      ),
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      filters: true,
      onFilter: true,
      valueType: 'select',
      valueEnum: {
        Dell: { text: 'Dell' },
        HP: { text: 'HP' },
        Lenovo: { text: 'Lenovo' },
        ASUS: { text: 'ASUS' },
        Acer: { text: 'Acer' },
        Apple: { text: 'Apple' },
        MSI: { text: 'MSI' },
        Samsung: { text: 'Samsung' },
      },
    },
    {
      title: 'Processor',
      dataIndex: 'processor',
      search: false,
      ellipsis: true,
    },
    {
      title: 'RAM',
      dataIndex: 'ram',
      search: false,
      width: 120,
    },
    {
      title: 'Storage',
      dataIndex: 'storage',
      search: false,
      width: 120,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      filters: true,
      onFilter: true,
      valueType: 'select',
      valueEnum: {
        Budget: { text: 'Budget', status: 'Default' },
        Premium: { text: 'Premium', status: 'Success' },
        Gaming: { text: 'Gaming', status: 'Error' },
        Business: { text: 'Business', status: 'Processing' },
        Creator: { text: 'Creator', status: 'Warning' },
        'Ultra-portable': { text: 'Ultra-portable', status: 'Default' },
      },
    },
    {
      title: 'Price',
      dataIndex: 'price',
      valueType: 'money',
      width: 120,
      sorter: (a, b) => a.price - b.price,
      render: (_, record) => `$${record.price}`,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      search: false,
      width: 100,
      render: (_, record) => (
        <Tag color={record.stock > 15 ? 'green' : record.stock > 5 ? 'orange' : 'red'}>
          {record.stock} units
        </Tag>
      ),
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      search: false,
      width: 100,
      render: (_, record) => <Tag color="gold">⭐ {record.rating}</Tag>,
    },
    {
      title: 'Action',
      valueType: 'option',
      width: 200,
      fixed: 'right',
      render: (text, record) => [
        <Button
          key="view"
          type="link"
          onClick={() => {
            setSelectedProduct(record);
            setDetailsVisible(true);
          }}
        >
          View Details
        </Button>,
        <Button
          key="buy"
          type="primary"
          size="small"
          icon={<ShoppingCartOutlined />}
          onClick={() => addToCart(record)}
          disabled={record.stock === 0}
        >
          Add to Cart
        </Button>,
      ],
    },
  ];

  return (
    <ProCard
      title={
        <Space>
          <LaptopOutlined style={{ fontSize: 24 }} />
          <span>PC Notebook eShop</span>
        </Space>
      }
      extra={
        <Space>
          <Statistic title="Products" value={notebookData.length} prefix={<LaptopOutlined />} />
          <Badge count={cart.length} showZero>
            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              onClick={() => setCartVisible(true)}
            >
              View Cart
            </Button>
          </Badge>
        </Space>
      }
      headerBordered
    >
      <ProTable<NotebookProduct>
        columns={columns}
        dataSource={notebookData}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
        }}
        dateFormatter="string"
        headerTitle="Available Notebooks"
        search={{
          labelWidth: 'auto',
        }}
        options={{
          setting: true,
          reload: true,
          density: true,
        }}
        scroll={{ x: 'max-content' }}
      />

      {/* Product Details Drawer */}
      <Drawer
        title="Product Details"
        placement="right"
        width={600}
        onClose={() => setDetailsVisible(false)}
        open={detailsVisible}
      >
        {selectedProduct && (
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <ProDescriptions<NotebookProduct>
              column={1}
              title={selectedProduct.name}
              dataSource={selectedProduct}
              columns={[
                {
                  title: 'Brand',
                  dataIndex: 'brand',
                },
                {
                  title: 'Processor',
                  dataIndex: 'processor',
                },
                {
                  title: 'RAM',
                  dataIndex: 'ram',
                },
                {
                  title: 'Storage',
                  dataIndex: 'storage',
                },
                {
                  title: 'Display',
                  dataIndex: 'display',
                },
                {
                  title: 'Graphics',
                  dataIndex: 'graphics',
                },
                {
                  title: 'Category',
                  dataIndex: 'category',
                  valueType: 'select',
                  valueEnum: {
                    Budget: { text: 'Budget', status: 'Default' },
                    Premium: { text: 'Premium', status: 'Success' },
                    Gaming: { text: 'Gaming', status: 'Error' },
                    Business: { text: 'Business', status: 'Processing' },
                    Creator: { text: 'Creator', status: 'Warning' },
                    'Ultra-portable': { text: 'Ultra-portable', status: 'Default' },
                  },
                },
                {
                  title: 'Price',
                  dataIndex: 'price',
                  valueType: 'money',
                  render: () => `$${selectedProduct.price}`,
                },
                {
                  title: 'Stock',
                  dataIndex: 'stock',
                  render: () => (
                    <Tag
                      color={
                        selectedProduct.stock > 15
                          ? 'green'
                          : selectedProduct.stock > 5
                          ? 'orange'
                          : 'red'
                      }
                    >
                      {selectedProduct.stock} units available
                    </Tag>
                  ),
                },
                {
                  title: 'Rating',
                  dataIndex: 'rating',
                  render: () => <Tag color="gold">⭐ {selectedProduct.rating}</Tag>,
                },
              ]}
            />
            <Button
              type="primary"
              size="large"
              block
              icon={<ShoppingCartOutlined />}
              onClick={() => {
                addToCart(selectedProduct);
                setDetailsVisible(false);
              }}
              disabled={selectedProduct.stock === 0}
            >
              Add to Cart - ${selectedProduct.price}
            </Button>
          </Space>
        )}
      </Drawer>

      {/* Shopping Cart Drawer */}
      <Drawer
        title={
          <Space>
            <ShoppingCartOutlined />
            Shopping Cart ({cart.length} items)
          </Space>
        }
        placement="right"
        width={500}
        onClose={() => setCartVisible(false)}
        open={cartVisible}
        footer={
          <Space style={{ width: '100%', justifyContent: 'space-between' }}>
            <Statistic
              title="Total"
              value={calculateTotal()}
              prefix={<DollarOutlined />}
              precision={2}
            />
            <Button
              type="primary"
              size="large"
              disabled={cart.length === 0}
              onClick={() => {
                setCartVisible(false);
                setCheckoutVisible(true);
              }}
            >
              Proceed to Checkout
            </Button>
          </Space>
        }
      >
        <List
          dataSource={cart}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button
                  key="remove"
                  type="link"
                  danger
                  onClick={() => removeFromCart(item.product.id)}
                >
                  Remove
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={item.product.name}
                description={
                  <Space direction="vertical">
                    <span>{item.product.brand}</span>
                    <span>
                      Quantity: {item.quantity} × ${item.product.price}
                    </span>
                    <strong>Subtotal: ${item.quantity * item.product.price}</strong>
                  </Space>
                }
              />
            </List.Item>
          )}
        />
      </Drawer>

      {/* Checkout Form Drawer */}
      <Drawer
        title="Checkout"
        placement="right"
        width={600}
        onClose={() => setCheckoutVisible(false)}
        open={checkoutVisible}
      >
        <ProForm
          formRef={formRef}
          onFinish={async (values) => {
            console.log('Order submitted:', values);
            message.success('Order placed successfully!');
            setCart([]);
            setCheckoutVisible(false);
            return true;
          }}
          submitter={{
            searchConfig: {
              submitText: 'Place Order',
            },
            render: (props, doms) => {
              return [
                <Space key="total" style={{ width: '100%', marginBottom: 16 }}>
                  <Statistic
                    title="Order Total"
                    value={calculateTotal()}
                    prefix={<DollarOutlined />}
                    precision={2}
                  />
                </Space>,
                ...doms,
              ];
            },
          }}
        >
          <ProCard title="Shipping Information" bordered headerBordered>
            <ProFormText
              name="fullName"
              label="Full Name"
              placeholder="Enter your full name"
              rules={[{ required: true, message: 'Please enter your full name' }]}
            />
            <ProFormText
              name="email"
              label="Email"
              placeholder="your.email@example.com"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' },
              ]}
            />
            <ProFormText
              name="phone"
              label="Phone"
              placeholder="Enter your phone number"
              rules={[{ required: true, message: 'Please enter your phone number' }]}
            />
            <ProFormTextArea
              name="address"
              label="Shipping Address"
              placeholder="Enter your shipping address"
              rules={[{ required: true, message: 'Please enter your address' }]}
            />
            <ProFormSelect
              name="country"
              label="Country"
              placeholder="Select country"
              options={[
                { label: 'United States', value: 'us' },
                { label: 'United Kingdom', value: 'uk' },
                { label: 'Canada', value: 'ca' },
                { label: 'Australia', value: 'au' },
                { label: 'Germany', value: 'de' },
              ]}
              rules={[{ required: true, message: 'Please select a country' }]}
            />
            <ProFormText
              name="zipCode"
              label="Zip Code"
              placeholder="Enter zip code"
              rules={[{ required: true, message: 'Please enter zip code' }]}
            />
          </ProCard>

          <ProCard title="Payment Information" bordered headerBordered style={{ marginTop: 16 }}>
            <ProFormText
              name="cardNumber"
              label="Card Number"
              placeholder="1234 5678 9012 3456"
              rules={[
                { required: true, message: 'Please enter card number' },
                {
                  pattern: /^[0-9]{13,19}$/,
                  message: 'Please enter a valid card number (13-19 digits)',
                },
              ]}
            />
            <ProFormText
              name="cardHolder"
              label="Card Holder Name"
              placeholder="Name on card"
              rules={[{ required: true, message: 'Please enter card holder name' }]}
            />
            <Space.Compact style={{ width: '100%' }}>
              <ProFormText
                name="expiryDate"
                label="Expiry Date"
                placeholder="MM/YY"
                rules={[
                  { required: true, message: 'Required' },
                  {
                    pattern: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                    message: 'Please enter a valid date (MM/YY)',
                  },
                  {
                    validator: (_, value) => {
                      if (!value) return Promise.resolve();
                      const [month, year] = value.split('/');
                      const expiry = new Date(2000 + parseInt(year), parseInt(month));
                      const now = new Date();
                      if (expiry < now) {
                        return Promise.reject(new Error('Card has expired'));
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
                width="md"
              />
              <ProFormText
                name="cvv"
                label="CVV"
                placeholder="123"
                rules={[
                  { required: true, message: 'Required' },
                  {
                    pattern: /^[0-9]{3,4}$/,
                    message: 'Please enter a valid CVV (3-4 digits)',
                  },
                ]}
                width="sm"
              />
            </Space.Compact>
          </ProCard>

          <ProCard title="Order Summary" bordered headerBordered style={{ marginTop: 16 }}>
            <List
              dataSource={cart}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={item.product.name}
                    description={`${item.quantity} × $${item.product.price}`}
                  />
                  <div>${item.quantity * item.product.price}</div>
                </List.Item>
              )}
            />
          </ProCard>
        </ProForm>
      </Drawer>
    </ProCard>
  );
};

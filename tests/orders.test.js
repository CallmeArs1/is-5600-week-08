const { create, list, get, edit } = require('../orders');
const productTestHelper = require('./test-utils/productTestHelper');
const orderData = require('../data/order1.json'); // Sample order data

describe('Orders Module', () => {
  let createdOrder;

  // Set up and clean up test data
  beforeAll(async () => {
    await productTestHelper.setupTestData();
    await productTestHelper.createTestOrders(5); // Create 5 test orders
  });

  afterAll(async () => {
    await productTestHelper.cleanupTestData();
  });

  // Test for listing orders
  describe('list', () => {
    it('should list orders', async () => {
      const orders = await list();
      expect(orders.length).toBeGreaterThan(4); // Ensure at least 5 orders exist
    });
  });

  // Test for creating an order
  describe('create', () => {
    it('should create an order', async () => {
      createdOrder = await create(orderData); // Create an order using sample data
      expect(createdOrder).toBeDefined();
      expect(createdOrder.buyerEmail).toBe(orderData.buyerEmail);
    });
  });

  // Test for getting an order by ID
  describe('get', () => {
    it('should retrieve an order by id', async () => {
      const order = await get(createdOrder._id); // Retrieve the order using its ID
      expect(order).toBeDefined();
      expect(order._id).toBe(createdOrder._id);
      expect(order.buyerEmail).toBe(orderData.buyerEmail);
    });
  });

  // Test for editing an order
  describe('edit', () => {
    it('should update an existing order', async () => {
      const changes = { buyerEmail: 'updated@example.com' }; // Define changes
      const updatedOrder = await edit(createdOrder._id, changes);

      expect(updatedOrder).toBeDefined();
      expect(updatedOrder._id).toBe(createdOrder._id);
      expect(updatedOrder.buyerEmail).toBe(changes.buyerEmail); // Verify the change
    });
  });
});

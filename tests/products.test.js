const { mockDb, mockProducts, mockModel } = require('./db.mock');
const { list, get, destroy } = require('../products');

// Mock the database module
jest.mock('../db', () => mockDb);

describe('Product Module', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mocks before each test
  });

  // Test for list()
  describe('list', () => {
    it('should list all products', async () => {
      const products = await list(); // Call the list function
      expect(mockModel.find).toHaveBeenCalled(); // Verify find() is called
      expect(products.length).toBe(2); // Verify correct product count
      expect(products[0].description).toBe('Product 1');
      expect(products[1].description).toBe('Product 2');
    });
  });

  // Test for get()
  describe('get', () => {
    it('should get a product by id', async () => {
      const productId = '1'; // Mock product ID
      const product = await get(productId); // Call the get function
      expect(mockModel.findById).toHaveBeenCalledWith(productId); // Verify findById is called
      expect(product).toBeDefined(); // Ensure a product is returned
      expect(product.description).toBe('Product 1'); // Validate returned product
    });
  });

  // Test for destroy()
  describe('destroy', () => {
    it('should delete a product by id', async () => {
      const productId = '1'; // Mock product ID
      const result = await destroy(productId); // Call the destroy function
      expect(mockModel.deleteOne).toHaveBeenCalledWith({ _id: productId }); // Verify deleteOne is called
      expect(result.deletedCount).toBe(1); // Ensure deleteCount is correct
    });
  });
});

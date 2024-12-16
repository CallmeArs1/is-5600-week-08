
/**
 * Mock data to simulate products returned from MongoDB.
 */
const mockProducts = [
  { _id: '1', description: 'Product 1' },
  { _id: '2', description: 'Product 2' }
];

/**
 * Mock Mongoose Query object.
 * Simulates the chainable query methods and ensures a resolved response.
 */
const mockQuery = {
  sort: jest.fn().mockReturnThis(),
  skip: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  then: jest.fn((resolve) => resolve(mockProducts)), // Handles implicit `await Product.find()`
  exec: jest.fn().mockResolvedValue(mockProducts),  // Resolves mockProducts if exec() is called
};

/**
 * Mock Mongoose Model object.
 * Simulates the methods (e.g., find, findById, deleteOne) that Mongoose provides.
 */
const mockModel = {
  find: jest.fn().mockReturnValue(mockQuery), // Simulates Product.find()
  findById: jest.fn().mockResolvedValue(mockProducts[0]), // Simulates Product.findById()
  deleteOne: jest.fn().mockResolvedValue({ deletedCount: 1 }) // Simulates Product.deleteOne()
};

/**
 * Mock DB object to simulate `db.model()` call.
 */
const mockDb = {
  model: jest.fn().mockReturnValue(mockModel),
};

module.exports = {
  mockDb,
  mockProducts,
  mockModel,
  mockQuery,
};

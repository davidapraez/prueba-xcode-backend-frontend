const mockQuery = { select: jest.fn().mockReturnThis(), exec: jest.fn() };
export const model = () => ({
  findOne: jest.fn().mockResolvedValue(null),
  create: jest.fn(),
});
export default { connect: jest.fn(), model, Schema: class {} };

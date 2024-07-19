const mockAsyncStorage = {
    storage: {},
    getItem: jest.fn((key) => Promise.resolve(mockAsyncStorage.storage[key] || null)),
    setItem: jest.fn((key, value) => {
        mockAsyncStorage.storage[key] = value;
        return Promise.resolve();
    }),
    removeItem: jest.fn((key) => {
        delete mockAsyncStorage.storage[key];
        return Promise.resolve();
    }),
};

export default mockAsyncStorage;

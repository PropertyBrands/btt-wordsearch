import { buildQuery, removeUnencodableValues } from '@/functions';

describe('buildQuery', () => {
  it('should properly encode an object', () => {
    const testObject = {
      key: 'with spaces',
      array: ['speci&/ chars'],
      associative: { key: 'value' },
    };

    expect(buildQuery(testObject)).to.equal(
      'key=with%20spaces&array[0]=speci%26%2F%20chars&associative[key]=value'
    );
  });
  it('should throw an error with invalid input', () => {
    const testObject = {
      invalid: () => 'functions should not work',
    };

    expect(buildQuery.bind(buildQuery, testObject)).to.throw.error;
  });
});

describe('removeUnencodableValues', () => {
  it("should remove keys with empty values from an object if they don't urlencode nicely", () => {
    const testObject = {
      emptyString: '',
      emptyNumber: 0,
      emptyObject: {},
      nullThing: null,
    };

    expect(removeUnencodableValues(testObject)).to.deep.equal({
      emptyString: '',
      emptyNumber: 0,
    });
  });
});

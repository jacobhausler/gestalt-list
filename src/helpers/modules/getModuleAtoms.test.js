import getModuleAtoms from './getModuleAtoms';

describe('getModuleAtoms', () => {
  const modules = {
    one: {
      atomType: {
        atom1: 'atom1',
        atom2: 'atom2',
      },
    },
    two: {
      atomType: {
        atom3: 'atom3',
      },
    },
  };

  it('should return an array of atoms given a collection modules', () => {
    getModuleAtoms(modules, 'atomType').should.deep.equal(['atom1', 'atom2', 'atom3']);
  });
});

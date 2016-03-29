// KARMA TEST
describe('mvUser', function() {
   beforeEach(module('app'));

    describe('isAdmin', function() {
        // bring in mvUser service
        it('should return false if the roles array does not have an admin entry', inject(function(mvUser) {
            // create new instance of that resource
            var user = new mvUser();
            // set roles property
            user.roles = ['not admin'];
            // set up assert
            expect(user.isAdmin()).to.be.falsey;
        }))

        it('should return true if the roles array has an admin entry', inject(function(mvUser) {
            var user = new mvUser();
            // same test only with the admin role into the array
            user.roles = ['admin'];
            expect(user.isAdmin()).to.be.true;
        }))
    })
});
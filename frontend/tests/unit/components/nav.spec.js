import { shallowMount } from '@vue/test-utils';
import NavComponent from '@/Shared/components/Nav.vue';
import store from '@/Shared/store';
import router from '@/Shared/router';

describe('Nav Component', () => {
  const wrapper = shallowMount(NavComponent, {
    global: {
      plugins: [router, store],
    },
  });

  it('renders nav correctly', () => {
    expect(wrapper.find('#nav').exists()).toBeTruthy();
  });

  it('check initial setup datas', () => {
    expect(wrapper.vm.isAuthModalOpen).toBeFalsy();
    expect(wrapper.vm.user).toBeNull();
    expect(wrapper.vm.isAdmin).toBeNull();
    expect(wrapper.vm.isAdminModule).toBeFalsy();
  });

  it('check that auth modal data is true when openAuthModal is called', () => {
    // call openAuthModal()
    wrapper.vm.openAuthModal();
    expect(wrapper.vm.isAuthModalOpen).toBeTruthy();
  });

  it('check that auth modal data is false when closeAuthModal is called', () => {
    // call closeAuthModal()
    wrapper.vm.closeAuthModal();
    expect(wrapper.vm.isAuthModalOpen).toBeFalsy();
  });

  it('check logout function', () => {
    // set user to any random value
    store.commit('setUser', { pseudonym: 'John Doe' });

    // call logout and check user computed property
    wrapper.vm.logout();
    expect(wrapper.vm.user).toBeNull();
  });

  it('check logout function from admin', () => {
    // set user to any random value
    store.commit('setUser', { role: 'admin', pseudonym: 'John Doe' });

    router.push('/admin');

    // call logout and check user computed property
    wrapper.vm.logout();
    expect(wrapper.vm.user).toBeNull();
  });
});

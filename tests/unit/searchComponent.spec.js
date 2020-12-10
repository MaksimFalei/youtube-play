import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import SearchComponent from '../../src/components/SearchComponent.vue';
describe('SearchComponent', () => {
  let localVue;
  let vuetify;
  let wrapper;
  beforeEach(() => {
    localVue = createLocalVue();
    vuetify = new Vuetify();

    const App = localVue.component('App', {
      components: { SearchComponent },
      data() {
        return { queryString: '' };
      },
      template: `
        <v-app>
          <SearchComponent
          v-model="queryString"
          />
        </v-app>
      `,
    });
    wrapper = mount(App, {
      localVue,
      vuetify,
    });
  });
  it('Checks that v-modal works', async () => {
    wrapper.setData({ queryString: 'Hello!' });
    await wrapper.vm.$nextTick(); // we have to wait until vue rerender the components content
    const component = wrapper.getComponent(SearchComponent);
    expect(component.vm.internalValue).toMatch('Hello!');
  });

  it('Checks tat clear button works', async () => {
    wrapper.setData({ queryString: 'Hello!' });
    await wrapper.vm.$nextTick(); // we have to wait until vue rerender the components content
    const component = wrapper.getComponent(SearchComponent);
    expect(component.vm.internalValue).toMatch('Hello!');
    const button = component.find('button');
    button.trigger('click');
    expect(wrapper.vm.queryString).toMatch('');
  });
});

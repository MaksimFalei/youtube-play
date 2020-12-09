import {render, fireEvent} from '@testing-library/vue';
import SearchComponent from "../../src/components/SearchComponent.vue";


describe('SearchComponent.vue', () => {
  it('Set value by props', () => {
      const component = render(SearchComponent);
      component.updateProps({value: 'Hello!'});
      // component.getByText('Hello');
      console.log('component.getByText: ', component.value);
      // assert(component.baseElement.textContent.includes('Hello!'));
  });
})

// test('Pro', () => {
//   const component = render(Copyright, {
//     propsData: {
//       name: 'Google'
//     }
//   });

//   assert(component.baseElement.textContent.includes('Google'))
//   assert(component.baseElement.textContent.includes(new Date().getFullYear() + ''));

// })

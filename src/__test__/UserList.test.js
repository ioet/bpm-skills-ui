import React from 'react';
import CategoryList from '../component/presentational/CategoryList';

describe('<CategoryList />', () => {
  test('Component Renders correctly', () => {
    const appWrapper = shallow(<CategoryList />);

    expect(toJson(appWrapper))
      .toMatchSnapshot();
  });
});

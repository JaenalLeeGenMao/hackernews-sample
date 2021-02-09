import React from 'react';

import { default as Navbar } from './index';

export default {
  title: 'Main/Navbar',
  component: Navbar,
  argTypes: {
    color: { control: 'color' },
    backgroundColor: { control: 'color' },
  },
};

const Template = (args) => <Navbar {...args} />;

export const Color = Template.bind({});
Color.args = {
  color: '#000000'
};

export const BackgroundColor = Template.bind({});
BackgroundColor.args = {
  backgroundColor: '#ff6600'
};

export const Title = Template.bind({});
Title.args = {
  title: 'Search'
};

export const isLogin = Template.bind({});
isLogin.args = {
  isLogin: true
};
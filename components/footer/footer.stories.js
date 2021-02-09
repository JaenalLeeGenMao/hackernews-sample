import React from 'react';

import { default as Footer } from './index';

export default {
  title: 'Main/Footer',
  component: Footer,
  argTypes: {
    lists: [
        {
            name: 'label',
            required: true
        }, {
            name: 'href',
            required: true
        }
    ]
  },
};

const Template = (args) => <Footer {...args} />;

export const EmptyLists = Template.bind({});
EmptyLists.args = {
  lists: []
};

export const Lists = Template.bind({});
Lists.args = {
  lists: [
    {
        label: "privacy",
        href: "/privacy"
    },
    {
        label: "about",
        href: "/about"
    },
    {
        label: "hyperlink",
        href: "https://www.google.com"
    }
  ]
};
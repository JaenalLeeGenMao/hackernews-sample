import React from 'react';

import { default as Card } from './index';

export default {
  title: 'Main/Card',
  component: Card
};

const Template = (args) => <Card {...args} />;

export const By = Template.bind({});
By.args = {
  by: 'norvig'
};

export const Descendants = Template.bind({});
Descendants.args = {
  descendants: 71
};

export const Id = Template.bind({});
Id.args = {
  itemId: 2921983
};

export const Comments = Template.bind({});
Comments.args = {
  kids: [ 2922097, 2922429, 2924562, 2922709, 2922573, 2922140, 2922141 ]
};

export const Score = Template.bind({});
Score.args = {
  score: 100
};

export const Time = Template.bind({});
Time.args = {
  time: 1175714200
};

export const Title = Template.bind({});
Title.args = {
  title: 'My YC app: Dropbox - Throw away your USB drive'
};

export const Type = Template.bind({});
Type.args = {
  size: 'stories'
};

export const Url = Template.bind({});
Url.args = {
  url: 'http://www.getdropbox.com/u/2/screencast.html',
};
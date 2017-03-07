## Sample Multi-language Website with API-based CMS

This is a sample multi-language website template with content managed from prismic.io (an API-based CMS).

#### Getting started

Read [this guide](https://prismic.io/docs/examples/website#?lang=node) for instructions on how to create your repository. This multi-language example is based off of the sample website in the guide.

Make sure to publish content for each language you need.

After running ```npm install``` on the project, make sure to update the dependency of the prismic-nodejs module. Go to the ```node_modules/prismic-nodejs``` directory and run the following command:

```
npm update prismic.io@3.4.0
```

This will ensure that the prismic.io module is up-to-date.

#### i18n Resources

The following are a few of the most important files to look at when exploring the i18n features of this website app.

##### app.js

Here you'll find the various routes for each language's version of the website.

##### prismic-configuration.js

Here you'll find the modified Link Resolver capable of creating links for the various languages.

##### /views

The views directory contains the pug template files for the homepage, pages, layout, header, footer, and various slice templates.

### Licence

This software is licensed under the Apache 2 license, quoted below.

Copyright 2016 Zengularity (http://www.zengularity.com).

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this project except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

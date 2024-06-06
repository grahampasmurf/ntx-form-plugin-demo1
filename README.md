# Nintex Form Plugins Starter Kit

The Form Plugins Starter Kit is a template repository used to develop Nintex Form Plugins using Lit.

- Based on Lit v2
- Local development against your Nintex Automation Cloud tenant
- A Typescript example based on the [Form Plugins SDK](https://help.nintex.com/en-US/formplugins/Home.htm) and examples,as well as Lit best practices
    - [Decorators](https://lit.dev/docs/v2/components/decorators/#decorators-typescript)
    - [Issues with class fields](https://lit.dev/docs/components/properties/#avoiding-issues-with-class-fields)
- Rollup bandling for minified production builds
- [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) configurations
- Visual Studio Code bundled configuration and recommended extensions
- Automatic deployment to your configured Azure Blob storage on succesfull production build
- Commonly used Lit templates

## Get Started
- Click on the `Use this template` button on this repository to create a new repository.
- Install dependencies using `npm i`

### Debug the Hello World plugin
- Start the `Debug` VS Code Task: `Terminal > Run Task > Debug`
- Wait for the build task to complete and the browser window to open @ https://127.0.0.1/.
  - If you don't see any files, refresh the browser window once the Debug Task is complete.
  - Both tasks will be visible in your VS Code terminal pane
- Add the plugin to your Nintex Automation Cloud Tenant
  - Under `Form Plugins`, click the `Add Plugin` button.
  - Use the `Link a URL` option, and register your plugin.
    - Copy the url to the sk-hello-world-dev.js.
    - Use `sk-hello-world-dev` as the element name.
  - Go to a Form and add the `Hello World DEV` plugin from the `Starter Kit DEV` toolbox group to your form.

### Build and publish a production version of the Hello World plugin
- Rename the `env.sample` file in the root folder to `env.`
- Open the file and provide your Azure Blob Storage configuration.
- Run the `Publish` VS Code Task: `Terminal > Run Task > Publish`
- Add the plugin to your Nintex Automation Cloud Tenant
  - Under `Form Plugins`, click the `Add Plugin` button.
  - Use the `Link a URL` option, and register your plugin.
    - Copy the url of your published plugin from the VS Code terminal pane.
    - Use `sk-hello-world` as the element name.
  - Go to a Form and add the `Hello World` plugin from the `Starter Kit` toolbox group to your form.
  
### Generate a new plugin
- Run the `Add plugin` VS Code Task: `Terminal > Run Task > Add plugin`
- Provide the information using the prompts in the terminal pane.
- Follow the Debug process to build and test your new plugin.
 
## Documentation

[Plugin definition](docs/definition.md)
[Local Development](docs/localdev.md)
[Production Builds](docs/productionbuilds.md)
[Plugin Generator](docs/generator.md)







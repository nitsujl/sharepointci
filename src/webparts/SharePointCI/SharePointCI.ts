import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import SharePointCIApp from "./components/SharePointCIApp";
import { sp } from "@pnp/sp";
import { graph } from "@pnp/graph";

export default class SharePointCI extends BaseClientSideWebPart<any> {
  public render(): void {
    const element: React.ReactElement<any> = React.createElement(
      SharePointCIApp,
      {
        description: this.properties.description,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }
  public onInit(): Promise<void> {
    return super.onInit().then((_) => {
      //
      // Find more on how to use this library here: https://pnp.github.io/pnpjs/sp
      sp.setup({
        spfxContext: this.context,
      });

      // This snippet sets up the web part to make use of the @pnp/graph library.
      // Find more on how to use this library here: https://pnp.github.io/pnpjs/graph
      graph.setup({
        spfxContext: this.context,
      });
    });
  }
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "Description",
          },
          groups: [
            {
              groupName: "Group Name",
              groupFields: [
                PropertyPaneTextField("description", {
                  label: "Label",
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}

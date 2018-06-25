import * as path from 'path';
import { TemplateType } from './enums/template-type';
import { ResourceType } from './enums/resource-type';
import { IResource } from './models/resource';
import { OptionType } from './enums/option-type';

export const resources = new Map<ResourceType, IResource>([
  [ResourceType.Module, {
    locDirName: (loc, config) => (!config.defaults.module.flat) ? loc.fileName : loc.dirName,
    locDirPath: (loc, config) => path.join(loc.dirPath, loc.dirName),
    files: [{ name: config => `component.${config.defaults.component.styleext || config.defaults.styleExt}`, type: TemplateType.ComponentStyle },
    { name: config => `component.html`, type: TemplateType.ComponentHtml },
    { name: config => `component.ts`, type: TemplateType.Component },
    { name: config => `module.ts`, type: TemplateType.Module },
    { name: config => `-routing.module.ts`, type: TemplateType.ModuleRouting, condition: (config, params) => config.defaults.module.routing },
    { name: config => `component.spec.ts`, type: TemplateType.ConponentSpec, condition: (config, params) => config.defaults.module.spec }],
    createFolder: config => !config.defaults.module.flat,
    options: [OptionType.Routing,
      OptionType.RoutingScope,
      OptionType.Spec,
      OptionType.Flat,
      OptionType.CommonModule,
      OptionType.Module],
  }],
  [ResourceType.Enum, { files: [{ name: config => `enum.ts`, type: TemplateType.Enum }] }],
  [ResourceType.Route, { files: [{ name: config => `routing.ts`, type: TemplateType.Route }] }],
  [ResourceType.Interface, { files: [{ name: config => `ts`, type: TemplateType.Inteface }] }],
  [ResourceType.Class, {
    files: [
      { name: config => `ts`, type: TemplateType.Class },
      { name: config => `spec.ts`, type: TemplateType.ClassSpec, condition: (config, params) => config.defaults.class.spec },
    ],
    options: [OptionType.Spec],
  }],
  [ResourceType.Service, {
    locDirName: (loc, config) => (!config.defaults.service.flat) ? loc.fileName : loc.dirName,
    locDirPath: (loc, config) => path.join(loc.dirPath, loc.dirName),
    files: [
      { name: config => `service.ts`, type: TemplateType.Service, condition: (config, params) => config.version === 'ng5' },
      { name: config => `service.ts`, type: TemplateType.ServiceNg6, condition: (config, params) => config.version === 'ng6' },
      { name: config => `service.spec.ts`, type: TemplateType.ServiceSpec, condition: (config, params) => config.defaults.service.spec },
    ],
    createFolder: config => !config.defaults.service.flat,
    options: [OptionType.Flat,
      OptionType.Spec],
  }],
  [ResourceType.Pipe, {
    locDirName: (loc, config) => (!config.defaults.pipe.flat) ? loc.fileName : loc.dirName,
    locDirPath: (loc, config) => path.join(loc.dirPath, loc.dirName),
    files: [
      { name: config => `pipe.ts`, type: TemplateType.Pipe },
      { name: config => `pipe.spec.ts`, type: TemplateType.PipeSpec, condition: (config, params) => config.defaults.pipe.spec },
    ],
    createFolder: config => !config.defaults.pipe.flat,
    declaration: 'pipe',
    options: [OptionType.Flat,
      OptionType.Spec,
      OptionType.SkipImport,
      OptionType.Module,
      OptionType.Export],
  }],
  [ResourceType.Directive, {
    locDirName: (loc, config) => (!config.defaults.directive.flat) ? loc.fileName : loc.dirName,
    locDirPath: (loc, config) => path.join(loc.dirPath, loc.dirName),
    declaration: 'directive',
    files: [
      { name: config => `directive.ts`, type: TemplateType.Directive },
      { name: config => `directive.spec.ts`, type: TemplateType.DirectiveSpec, condition: (config, params) => config.defaults.directive.spec },
    ],
    createFolder: config => !config.defaults.directive.flat,
    options: [OptionType.Prefix,
      OptionType.Spec,
      OptionType.SkipImport,
      OptionType.Selector,
      OptionType.Flat,
      OptionType.Module,
      OptionType.Export],
  }],
  [ResourceType.Component, {
    locDirName: (loc, config) => (!config.defaults.component.flat) ? loc.fileName : loc.dirName,
    locDirPath: (loc, config) => path.join(loc.dirPath, loc.dirName),
    declaration: 'component',
    files: [{ name: config => `component.ts`, type: TemplateType.Component },
    { name: config => `component.${config.defaults.component.styleext || config.defaults.styleExt}`, type: TemplateType.ComponentStyle, condition: (config, params) => !config.defaults.component.inlineStyle },
    { name: config => `component.html`, type: TemplateType.ComponentHtml, condition: (config, params) => !config.defaults.component.inlineTemplate },
    { name: config => `component.spec.ts`, type: TemplateType.ConponentSpec, condition: (config, params) => config.defaults.component.spec },
    ],
    createFolder: config => !config.defaults.component.flat,
    options: [OptionType.InlineStyle,
      OptionType.InlineTemplate,
      OptionType.ViewEncapsulation,
      OptionType.ChangeDetection,
      OptionType.Prefix,
      OptionType.Styleext,
      OptionType.Spec,
      OptionType.Flat,
      OptionType.SkipImport,
      OptionType.Selector,
      OptionType.Module,
      OptionType.Export],
  }],
]);

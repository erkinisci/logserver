declare var nodeModule: NodeModule;


interface NodeModule {
  id: string;
}

declare var window: Window;
interface Window {
  process: any;
  require: any;
}

declare var require: NodeRequire;
interface NodeRequire {
  ensure: any;
} 

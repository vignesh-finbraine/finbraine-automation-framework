class Container {
  private dependencies: Map<string, any>;

  constructor() {
    this.dependencies = new Map<string, any>();
  }

  public register<T>(name: string, dependency: T): void {
    this.dependencies.set(name, dependency);
  }

  public resolve<T>(name: string): T {
    const dependency = this.dependencies.get(name);
    if (!dependency) {
      throw new Error(`Dependency '${name}' not found.`);
    }
    return dependency as T;
  }

  public remove(name: string): void {
    if (this.dependencies.has(name)) {
      this.dependencies.delete(name);
    } else {
      throw new Error(`Dependency '${name}' not found.`);
    }
  }
}

export default Container;

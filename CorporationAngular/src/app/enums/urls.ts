
export enum Urls{
    REGION = 'https://localhost:5001/api/Region',
    FACTORY = 'https://localhost:5001/api/Factory',
    STORAGES = 'https://localhost:5001/api/Storage',
    MANUFACTURER = 'https://localhost:5001/api/Manufacturer',
    CATEGORY = 'https://localhost:5001/api/CategoryProduct',
    UNIT = 'https://localhost:5001/api/UnitProduct',
    PRODUCT_TEMPLATES = 'https://localhost:5001/api/ProductTemplates'

    // "https://localhost:5001/api/ProductTemplates/ById?id=15"
}

export enum RegionUrls{
    BY_ID = '/ById'
}

export enum FactoryUrls{
    BY_ID = '/ById'
}

export enum StorageUrls{
    BY_ID = '/ById'
}

export enum ManufacturerUrls{
    BY_ID = '/ById'
}

export enum CategoryUrls{
    BY_ID = '/ById'
}

export enum UnitUrls{
    BY_ID = '/ById'
}

export enum ProductTemplates{
    START_WITH = '/StartWith',
    BY_ID = '/ById',
    BY_USER = '/ByUser',
    ADD = '/Add',
    DETAIL = '/detail'
}


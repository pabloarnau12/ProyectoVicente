

export interface ProductoUnico {
    id: number
    nombre: string
    tipo: string
    descripcion: string
    descripcion_extendida:string
    precio: number
    foto: string
    related_shops: RelatedShops[]
  }
  
  export interface RelatedShops {
    id: number
    nombre: string
    precio: number
    foto: string
  }
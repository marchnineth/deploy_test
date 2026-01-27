import { ArrowRight, Plus } from "lucide-react"

export function CollectionSection() {
  const collections = [
    {
      title: "Essential Collection",
      description: "일상의 모든 순간을 위한 베이직 라인",
      image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&h=800&fit=crop&q=80"
    },
    {
      title: "Signature Collection",
      description: "ÉLEVE의 아이덴티티를 담은 시그니처 라인",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop&q=80"
    },
    {
      title: "Premium Collection",
      description: "특별한 순간을 위한 프리미엄 라인",
      image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=800&fit=crop&q=80"
    }
  ]

  return (
    <section id="collection" className="py-24 lg:py-32 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 lg:mb-16">
          <div>
            <span className="text-xs font-sans uppercase tracking-widest text-muted-foreground">Collections</span>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-foreground">
              컬렉션 소개
            </h2>
          </div>
          <a href="#" className="mt-4 md:mt-0 inline-flex items-center gap-2 font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">
            전체 컬렉션 보기
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {collections.map((collection) => (
            <div key={collection.title} className="group cursor-pointer">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-muted">
                <img
                  src={collection.image || "/placeholder.svg"}
                  alt={collection.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors" />
                <button className="absolute top-4 right-4 h-10 w-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Plus className="h-5 w-5" />
                </button>
              </div>
              <h3 className="mt-4 font-serif text-lg font-medium text-foreground">
                {collection.title}
              </h3>
              <p className="mt-1 font-sans text-sm text-muted-foreground">
                {collection.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

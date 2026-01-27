import { Button } from "@/components/ui/button"

export function StorySection() {
  return (
    <section id="story" className="py-24 lg:py-32 px-6 lg:px-8 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=800&fit=crop&q=80"
                  alt="패션 작업 과정"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=400&fit=crop&q=80"
                  alt="의류 매장"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="pt-8">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=800&fit=crop&q=80"
                  alt="패션 디테일"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="text-xs font-sans uppercase tracking-widest text-muted-foreground">Our Story</span>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-foreground leading-tight">
              2015년,
              <br />
              작은 아틀리에에서 시작된 이야기
            </h2>
            <div className="mt-8 space-y-6 font-sans text-muted-foreground leading-relaxed">
              <p>
                서울 성수동의 작은 아틀리에에서 시작된 ÉLEVE는 
                '높이 올리다'라는 프랑스어에서 그 이름을 가져왔습니다. 
                우리는 패션을 통해 사람들의 삶을 높이 올리겠다는 
                신념으로 첫 컬렉션을 선보였습니다.
              </p>
              <p>
                10년이 지난 지금, ÉLEVE는 국내 50개 이상의 매장과 
                해외 진출을 이룬 프리미엄 패션 브랜드로 성장했습니다. 
                하지만 우리의 핵심 가치인 지속 가능성과 장인 정신은 
                여전히 변함없이 유지되고 있습니다.
              </p>
            </div>
            <Button className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90 font-sans">
              자세히 알아보기
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

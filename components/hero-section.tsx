import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 lg:px-8 pt-20">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight text-foreground leading-tight text-balance">
          스타일을 통해
          <br />
          당신을 표현하다
        </h1>
        <p className="mt-6 lg:mt-8 text-base lg:text-lg font-sans text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
          ÉLEVE는 지속 가능한 패션과 세련된 디자인을 통해
          <br className="hidden md:block" />
          당신만의 특별한 스타일을 완성합니다.
        </p>
        <div className="mt-10 lg:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-sans px-8 py-6 text-base">
            브랜드 스토리 보기
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" className="font-sans px-8 py-6 text-base border-foreground/20 hover:bg-secondary bg-transparent">
            컬렉션 둘러보기
          </Button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="mt-16 lg:mt-20 w-full max-w-5xl mx-auto">
        <div className="aspect-[16/9] lg:aspect-[21/9] rounded-2xl overflow-hidden bg-muted">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&h=700&fit=crop&q=80"
            alt="ÉLEVE 패션 컬렉션"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Quick Links */}
      <div className="mt-12 lg:mt-16 flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-16 text-center">
        <a href="#story" className="group flex flex-col items-center gap-2">
          <span className="text-xs font-sans uppercase tracking-widest text-muted-foreground">브랜드 스토리</span>
          <span className="h-8 w-8 rounded-full border border-accent flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
            <ArrowRight className="h-4 w-4" />
          </span>
        </a>
        <a href="#collection" className="group flex flex-col items-center gap-2">
          <span className="text-xs font-sans uppercase tracking-widest text-muted-foreground">새로운 컬렉션</span>
          <span className="h-8 w-8 rounded-full border border-accent flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
            <ArrowRight className="h-4 w-4" />
          </span>
        </a>
      </div>
    </section>
  )
}

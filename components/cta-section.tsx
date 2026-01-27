import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section id="contact" className="py-24 lg:py-32 px-6 lg:px-8 bg-primary text-primary-foreground">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-tight text-balance">
          당신의 스타일을 찾아보세요
        </h2>
        <p className="mt-6 font-sans text-primary-foreground/80 max-w-xl mx-auto leading-relaxed">
          ÉLEVE의 새로운 컬렉션과 특별 혜택을 가장 먼저 만나보세요.
          뉴스레터를 구독하시면 첫 구매 시 15% 할인을 드립니다.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <input
            type="email"
            placeholder="이메일 주소를 입력하세요"
            className="flex-1 px-4 py-3 rounded-lg bg-primary-foreground text-primary placeholder:text-primary/50 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-sans px-6">
            구독하기
          </Button>
        </div>

        <p className="mt-4 font-sans text-xs text-primary-foreground/60">
          구독 시 개인정보 처리방침에 동의하게 됩니다.
        </p>
      </div>
    </section>
  )
}

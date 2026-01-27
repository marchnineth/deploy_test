export function AboutSection() {
  return (
    <section id="about" className="py-24 lg:py-32 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 lg:mb-20">
          <span className="text-xs font-sans uppercase tracking-widest text-muted-foreground">About Us</span>
          <h2 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-foreground">
            우리의 핵심 가치
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* Value Card 1 */}
          <div className="p-8 lg:p-12 bg-card border border-border rounded-2xl">
            <span className="font-serif text-6xl lg:text-8xl font-light text-foreground/10">1</span>
            <h3 className="mt-4 font-serif text-xl lg:text-2xl font-medium text-foreground">
              지속 가능한 패션
            </h3>
            <p className="mt-4 font-sans text-muted-foreground leading-relaxed">
              환경을 생각하는 소재 선택과 윤리적인 생산 과정을 통해 
              지속 가능한 패션을 추구합니다. 우리의 모든 제품은 
              친환경 인증을 받은 원단으로 제작됩니다.
            </p>
          </div>

          {/* Value Card 2 */}
          <div className="p-8 lg:p-12 bg-card border border-border rounded-2xl">
            <span className="font-serif text-6xl lg:text-8xl font-light text-foreground/10">2</span>
            <h3 className="mt-4 font-serif text-xl lg:text-2xl font-medium text-foreground">
              시대를 초월한 디자인
            </h3>
            <p className="mt-4 font-sans text-muted-foreground leading-relaxed">
              트렌드에 휩쓸리지 않는 클래식한 디자인으로 
              오랫동안 사랑받을 수 있는 옷을 만듭니다. 
              심플하지만 세련된 실루엣이 특징입니다.
            </p>
          </div>
        </div>

        {/* Brand Statement */}
        <div className="mt-16 lg:mt-24 text-center">
          <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl font-medium text-foreground leading-relaxed text-balance">
            혁신과 전통의 조화,
            <br />
            지속 가능함과 아름다움의 균형
          </h3>
          <p className="mt-6 font-sans text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            ÉLEVE는 패션의 미래를 만들어갑니다. 우리는 환경을 보호하면서도 
            세련된 스타일을 포기하지 않는 새로운 패션 문화를 선도합니다.
          </p>
        </div>
      </div>
    </section>
  )
}

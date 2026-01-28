export function StatsSection() {
  const stats = [
    {
      number: "50+",
      label: "전국 매장",
      description: "서울, 부산, 대구 등 전국 주요 도시"
    },
    {
      number: "98%",
      label: "고객 만족도",
      description: "재구매 의향 고객 비율"
    },
    {
      number: "100%",
      label: "친환경 소재",
      description: "지속 가능한 원단 사용"
    },
    {
      number: "10년",
      label: "브랜드 역사",
      description: "2015년 설립 이래"
    }
  ]

  return (
    <section className="py-24 lg:py-32 px-6 lg:px-8 border-y border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {stats.map((stat, index) => (
            <div 
              key={stat.label} 
              className={`text-center lg:text-left ${index < stats.length - 1 ? 'lg:border-r lg:border-border' : ''} lg:px-8 first:lg:pl-0 last:lg:pr-0`}
            >
              <span className="font-serif text-4xl lg:text-5xl font-medium text-foreground">
                {stat.number}
              </span>
              <p className="mt-2 font-sans text-sm font-medium text-foreground">
                {stat.label}
              </p>
              <p className="mt-1 font-sans text-xs text-muted-foreground">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ChevronDown } from "lucide-react"

const faqData = [
  {
    category: "배송",
    items: [
      {
        question: "배송 기간은 얼마나 걸리나요?",
        answer: "주문 확인 후 2-3일 내에 제품을 준비하여 발송합니다. 배송은 일반적으로 발송일로부터 2-5일 정도 소요됩니다. 제주도 및 도서산간 지역의 경우 추가 배송일이 소요될 수 있습니다."
      },
      {
        question: "배송비는 얼마인가요?",
        answer: "전국 무료배송을 제공합니다. 단, 제주도 및 도서산간 지역의 경우 추가 배송비가 발생할 수 있으며, 이는 주문 시 안내해드립니다."
      },
      {
        question: "배송 추적은 어떻게 하나요?",
        answer: "주문 완료 후 배송 시작 시 SMS와 이메일로 송장번호를 발송해드립니다. 송장번호를 통해 배송 추적이 가능합니다. 마이페이지의 주문 내역에서도 확인하실 수 있습니다."
      },
      {
        question: "해외 배송이 가능한가요?",
        answer: "현재는 국내 배송만 가능합니다. 해외 배송 서비스는 준비 중이며, 추후 공지해드리겠습니다."
      }
    ]
  },
  {
    category: "사이즈",
    items: [
      {
        question: "사이즈 가이드를 확인하고 싶어요.",
        answer: "각 제품 상세 페이지에 사이즈 가이드가 제공됩니다. 제품별로 측정 방법과 사이즈별 치수가 상세히 안내되어 있습니다. 정확한 사이즈 선택을 위해 실제 신체 치수를 측정하신 후 가이드를 참고해주세요."
      },
      {
        question: "사이즈 교환이 가능한가요?",
        answer: "네, 제품 수령 후 7일 이내에 사이즈 교환이 가능합니다. 단, 제품이 미착용 상태이며 태그가 부착된 원래 상태여야 합니다. 교환 신청은 마이페이지의 주문 내역에서 가능합니다."
      },
      {
        question: "한 사이즈만 판매하나요?",
        answer: "아니요, 대부분의 제품은 XS부터 XL까지 다양한 사이즈를 제공합니다. 일부 제품은 사이즈 옵션이 제한될 수 있으며, 이는 제품 상세 페이지에서 확인하실 수 있습니다."
      },
      {
        question: "사이즈가 맞지 않으면 어떻게 하나요?",
        answer: "제품 수령 후 7일 이내에 교환이 가능합니다. 교환 신청 시 원하시는 사이즈를 선택하시면 됩니다. 교환 배송비는 무료입니다. 단, 환불 후 재주문을 원하시는 경우 배송비가 발생할 수 있습니다."
      }
    ]
  },
  {
    category: "원단",
    items: [
      {
        question: "어떤 원단을 사용하나요?",
        answer: "ÉLEVE는 친환경 인증을 받은 고품질 원단만을 사용합니다. 주로 오가닉 코튼, 재생 폴리에스터, 텐셀 등 지속 가능한 소재를 선별하여 사용하며, 각 제품의 상세 페이지에 원단 정보가 명시되어 있습니다."
      },
      {
        question: "원단이 알레르기를 유발할 수 있나요?",
        answer: "저희가 사용하는 원단은 피부 친화적인 소재로 제작되어 있습니다. 다만, 개인차가 있을 수 있으므로 특정 소재에 알레르기가 있으신 경우 제품 상세 페이지의 원단 정보를 확인하시기 바랍니다. 문제가 발생할 경우 즉시 사용을 중단하시고 의사와 상담하시기 바랍니다."
      },
      {
        question: "세탁 방법을 알려주세요.",
        answer: "각 제품에는 세탁 라벨이 부착되어 있으며, 제품 상세 페이지에도 세탁 방법이 안내되어 있습니다. 일반적으로 드라이클리닝을 권장하는 제품과 세탁기 사용이 가능한 제품으로 구분됩니다. 원단의 특성에 따라 세탁 방법이 다를 수 있으니 제품별 안내를 확인해주세요."
      },
      {
        question: "원단이 변색되거나 줄어들 수 있나요?",
        answer: "고품질 원단을 사용하여 제작되지만, 세탁 방법에 따라 일부 변색이나 수축이 발생할 수 있습니다. 세탁 라벨의 안내를 따라 세탁하시면 최소화할 수 있습니다. 첫 세탁 시에는 찬물에 단독 세탁을 권장합니다."
      },
      {
        question: "친환경 원단인가요?",
        answer: "네, ÉLEVE는 지속 가능한 패션을 지향하며 친환경 인증을 받은 원단을 사용합니다. GOTS(Global Organic Textile Standard) 인증 원단과 재생 소재를 우선적으로 사용하며, 각 제품의 상세 페이지에서 원단 인증 정보를 확인하실 수 있습니다."
      }
    ]
  }
]

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id)
    } else {
      newOpenItems.add(id)
    }
    setOpenItems(newOpenItems)
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="pt-24 lg:pt-32 pb-24 lg:pb-32 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 lg:mb-20">
            <span className="text-xs font-sans uppercase tracking-widest text-muted-foreground">FAQ</span>
            <h1 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-foreground">
              자주 묻는 질문
            </h1>
            <p className="mt-6 font-sans text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              고객님들께서 자주 문의하시는 내용을 정리했습니다. 
              궁금한 점이 있으시면 언제든지 문의해주세요.
            </p>
          </div>

          <div className="space-y-8">
            {faqData.map((category, categoryIndex) => (
              <div key={categoryIndex} className="space-y-4">
                <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground mb-6">
                  {category.category}
                </h2>
                <div className="space-y-4">
                  {category.items.map((item, itemIndex) => {
                    const itemId = `item-${categoryIndex}-${itemIndex}`
                    const isOpen = openItems.has(itemId)
                    return (
                      <div
                        key={itemIndex}
                        className="bg-card border border-border rounded-lg overflow-hidden"
                      >
                        <button
                          onClick={() => toggleItem(itemId)}
                          className="w-full px-6 py-4 flex items-center justify-between text-left font-sans font-medium text-foreground hover:bg-accent/50 transition-colors"
                        >
                          <span className="flex-1 pr-4">{item.question}</span>
                          <ChevronDown
                            className={`h-5 w-5 shrink-0 transition-transform duration-200 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-4 pt-0">
                            <p className="text-muted-foreground font-sans leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 lg:mt-24 text-center p-8 bg-card border border-border rounded-2xl">
            <h3 className="font-serif text-xl md:text-2xl font-medium text-foreground mb-4">
              더 궁금한 점이 있으신가요?
            </h3>
            <p className="font-sans text-muted-foreground mb-6">
              추가 문의사항이 있으시면 언제든지 연락주세요.
            </p>
            <a 
              href="#contact" 
              className="inline-block px-6 py-3 bg-primary text-primary-foreground font-sans text-sm rounded-md hover:bg-primary/90 transition-colors"
            >
              문의하기
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

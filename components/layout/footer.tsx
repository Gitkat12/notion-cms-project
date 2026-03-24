import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

export function Footer() {
  return (
    <footer className="border-t bg-muted/50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* 브랜드 */}
          <div>
            <h3 className="font-bold text-lg mb-4">StarterKit</h3>
            <p className="text-sm text-muted-foreground">
              Next.js 16 기반 모던 웹 스타터킷
            </p>
          </div>

          {/* 제품 */}
          <div>
            <h4 className="font-semibold text-sm mb-4">제품</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  기능
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  가격
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  보안
                </Link>
              </li>
            </ul>
          </div>

          {/* 개발자 */}
          <div>
            <h4 className="font-semibold text-sm mb-4">개발자</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  문서
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  API
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  GitHub
                </Link>
              </li>
            </ul>
          </div>

          {/* 회사 */}
          <div>
            <h4 className="font-semibold text-sm mb-4">회사</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  블로그
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  채용
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  문의
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* 하단 */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; 2026 StarterKit. 모든 권리 보유.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-foreground transition-colors">
              개인정보 보호정책
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              이용약관
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              쿠키 설정
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

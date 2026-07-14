import { useState } from 'react'
import { MessageCircle, MapPin, Clock, Mail } from 'lucide-react'
import Breadcrumb from '../components/Breadcrumb'
import Reveal from '../components/Reveal'
import { siteConfig, whatsappLink } from '../config'
import InstagramIcon from '../components/InstagramIcon'

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="pt-28 md:pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Contato' }]} />

        <Reveal>
          <h1 className="font-display text-4xl md:text-6xl uppercase text-paper mt-5 mb-14">Contato</h1>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-14">
          {/* Form */}
          <Reveal>
            <div>
              {sent ? (
                <div className="border border-smoke p-10 text-center">
                  <p className="font-display text-2xl uppercase text-paper mb-3">Mensagem enviada</p>
                  <p className="text-concrete text-sm mb-6">
                    Recebemos seu contato e vamos te responder em breve. Se preferir, fale com a gente agora
                    pelo WhatsApp.
                  </p>
                  <a
                    href={whatsappLink('Olá! Acabei de enviar uma mensagem pelo site.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-paper text-ink px-6 py-3 font-mono text-xs uppercase tracking-wider hover:bg-signal transition-colors"
                  >
                    <MessageCircle size={16} /> Abrir WhatsApp
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="font-mono text-xs uppercase tracking-wider text-paper block mb-2">
                      Nome
                    </label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-transparent border border-smoke focus:border-paper outline-none px-4 py-3 text-paper text-sm transition-colors"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="font-mono text-xs uppercase tracking-wider text-paper block mb-2">
                        Telefone
                      </label>
                      <input
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full bg-transparent border border-smoke focus:border-paper outline-none px-4 py-3 text-paper text-sm transition-colors"
                        placeholder="(19) 99999-9999"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-xs uppercase tracking-wider text-paper block mb-2">
                        E-mail
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-transparent border border-smoke focus:border-paper outline-none px-4 py-3 text-paper text-sm transition-colors"
                        placeholder="voce@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-mono text-xs uppercase tracking-wider text-paper block mb-2">
                      Mensagem
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-transparent border border-smoke focus:border-paper outline-none px-4 py-3 text-paper text-sm transition-colors resize-none"
                      placeholder="Como podemos ajudar?"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-paper text-ink px-8 py-4 font-mono text-xs uppercase tracking-wider hover:bg-signal transition-colors"
                  >
                    Enviar mensagem
                  </button>
                </form>
              )}

              <a
                href={whatsappLink('Olá! Vim pelo site e gostaria de saber mais.')}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-signal hover:underline"
              >
                <MessageCircle size={15} /> ou fale direto pelo WhatsApp
              </a>
            </div>
          </Reveal>

          {/* Info */}
          <Reveal delay={100}>
            <div className="space-y-8">
              <div className="aspect-[4/3] border border-smoke overflow-hidden">
                <iframe
                  title="Mapa"
                  className="w-full h-full grayscale contrast-125"
                  loading="lazy"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(siteConfig.address)}&output=embed`}
                />
              </div>

              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-signal mt-0.5 shrink-0" />
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-concrete mb-1">Endereço</p>
                    <p className="text-paper text-sm">{siteConfig.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-signal mt-0.5 shrink-0" />
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-concrete mb-1">
                      Horário de atendimento
                    </p>
                    <p className="text-paper text-sm">{siteConfig.hours}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail size={18} className="text-signal mt-0.5 shrink-0" />
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-concrete mb-1">E-mail</p>
                    <p className="text-paper text-sm">{siteConfig.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <InstagramIcon size={18} className="text-signal mt-0.5 shrink-0" />
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-concrete mb-1">Instagram</p>
                    <a
                      href={siteConfig.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-paper text-sm hover:text-signal"
                    >
                      {siteConfig.instagramHandle}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  )
}

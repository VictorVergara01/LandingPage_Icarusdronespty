'use client';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { RevealWrapper } from '@/components/ui/RevealWrapper';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';

interface ContactForm {
  nombre: string;
  whatsapp: string;
  ubicacion: string;
  cultivo: string;
  hectareas: number;
  mensaje: string;
}

const inputCls = 'w-full px-4 py-3 rounded-lg text-sm transition-all duration-200 focus:outline-none min-h-[44px] font-sans';
const inputStyle = {
  backgroundColor: 'var(--panel)',
  border: '1.5px solid rgba(0,204,53,0.18)',
  color: 'var(--text)',
};

export function Contacto() {
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? 'success' : 'error');
      if (res.ok) reset();
    } catch { setStatus('error'); }
  };

  return (
    <section
      id="contacto"
      className="section-pad section-sep relative overflow-hidden"
      style={{ backgroundColor: 'var(--dark)' }}
      aria-labelledby="contacto-heading"
    >
      {/* BG glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0,204,53,0.06) 0%, transparent 70%)' }}
      />

      <div className="container-xl relative z-10">
        <RevealWrapper>
          <div className="text-center mb-12">
            <SectionEyebrow>Contacto</SectionEyebrow>
            <h2
              id="contacto-heading"
              className="font-serif font-bold leading-tight"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: 'var(--text)' }}
            >
              Llevá tu cultivo al siguiente nivel
            </h2>
            <p className="mt-3 text-base max-w-lg mx-auto" style={{ color: 'var(--text-mid)' }}>
              Respondemos en menos de 24 horas con el presupuesto completo para tu finca.
            </p>
          </div>
        </RevealWrapper>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Info */}
          <RevealWrapper>
            <div className="flex flex-col gap-5">
              <div className="card-dark p-7">
                <h3 className="font-semibold text-sm mb-6" style={{ color: 'var(--text)' }}>Información de contacto</h3>
                <div className="flex flex-col gap-5">
                  {[
                    {
                      icon: <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>,
                      label: 'Ubicación', value: 'Las Tablas, Los Santos, Panamá',
                    },
                    {
                      icon: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,
                      label: 'Email', value: 'info@icarusdronespty.com', href: 'mailto:info@icarusdronespty.com',
                    },
                    {
                      icon: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
                      label: 'Horario', value: 'Lun–Sáb · 7:00 am – 5:00 pm',
                    },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--neon)" strokeWidth="2" className="mt-0.5 shrink-0" aria-hidden="true">
                        {item.icon}
                      </svg>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: 'var(--text-lt)' }}>{item.label}</p>
                        {item.href
                          ? <a href={item.href} className="text-sm transition-colors hover:text-[var(--neon-lt)]" style={{ color: 'var(--text-mid)' }}>{item.value}</a>
                          : <p className="text-sm" style={{ color: 'var(--text-mid)' }}>{item.value}</p>
                        }
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* WhatsApp */}
              <a
                href="https://wa.me/50760000000?text=Hola%2C%20me%20interesa%20una%20cotizaci%C3%B3n%20para%20fumigaci%C3%B3n%20con%20drones"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-bold text-base transition-all duration-200 hover:brightness-110 focus-visible:outline-2"
                style={{ backgroundColor: '#25D366', color: '#fff', minHeight: '56px' }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Escribir por WhatsApp
              </a>
            </div>
          </RevealWrapper>

          {/* Form */}
          <RevealWrapper delay={100}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="card-dark p-8 flex flex-col gap-6"
              aria-label="Formulario de cotización"
            >
              <div>
                <label htmlFor="nombre" className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-lt)' }}>
                  Nombre <span aria-hidden="true" style={{ color: 'var(--neon)' }}>*</span>
                </label>
                <input id="nombre" type="text" autoComplete="name" placeholder="Tu nombre completo"
                  className={inputCls}
                  style={{ ...inputStyle, ...(errors.nombre ? { borderColor: '#dc2626' } : {}) }}
                  aria-required="true" aria-invalid={!!errors.nombre}
                  {...register('nombre', { required: 'Requerido' })}
                />
                {errors.nombre && <p role="alert" className="text-xs mt-1" style={{ color: '#dc2626' }}>{errors.nombre.message}</p>}
              </div>

              <div>
                <label htmlFor="whatsapp" className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-lt)' }}>
                  WhatsApp <span aria-hidden="true" style={{ color: 'var(--neon)' }}>*</span>
                </label>
                <input id="whatsapp" type="tel" autoComplete="tel" placeholder="+507 6000-0000"
                  className={inputCls}
                  style={{ ...inputStyle, ...(errors.whatsapp ? { borderColor: '#dc2626' } : {}) }}
                  aria-required="true" aria-invalid={!!errors.whatsapp}
                  {...register('whatsapp', { required: 'Requerido' })}
                />
                {errors.whatsapp && <p role="alert" className="text-xs mt-1" style={{ color: '#dc2626' }}>{errors.whatsapp.message}</p>}
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="ubicacion" className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-lt)' }}>
                    Ubicación <span aria-hidden="true" style={{ color: 'var(--neon)' }}>*</span>
                  </label>
                  <input id="ubicacion" type="text" placeholder="Las Tablas, Los Santos"
                    className={inputCls}
                    style={{ ...inputStyle, ...(errors.ubicacion ? { borderColor: '#dc2626' } : {}) }}
                    aria-required="true" aria-invalid={!!errors.ubicacion}
                    {...register('ubicacion', { required: 'Requerido' })}
                  />
                  {errors.ubicacion && <p role="alert" className="text-xs mt-1" style={{ color: '#dc2626' }}>{errors.ubicacion.message}</p>}
                </div>
                <div>
                  <label htmlFor="cultivo" className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-lt)' }}>
                    Cultivo <span aria-hidden="true" style={{ color: 'var(--neon)' }}>*</span>
                  </label>
                  <select id="cultivo"
                    className={inputCls}
                    style={{ ...inputStyle, cursor: 'pointer', ...(errors.cultivo ? { borderColor: '#dc2626' } : {}) }}
                    aria-required="true" aria-invalid={!!errors.cultivo}
                    {...register('cultivo', { required: 'Seleccioná' })}
                  >
                    <option value="">Seleccionar…</option>
                    <option value="arroz">Arroz</option>
                    <option value="maiz">Maíz</option>
                    <option value="tomate">Tomate</option>
                    <option value="cana">Caña de azúcar</option>
                    <option value="otro">Otro</option>
                  </select>
                  {errors.cultivo && <p role="alert" className="text-xs mt-1" style={{ color: '#dc2626' }}>{errors.cultivo.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="hectareas" className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-lt)' }}>
                  Hectáreas <span aria-hidden="true" style={{ color: 'var(--neon)' }}>*</span>
                </label>
                <input id="hectareas" type="number" min="1" placeholder="Ej: 25"
                  className={inputCls}
                  style={{ ...inputStyle, ...(errors.hectareas ? { borderColor: '#dc2626' } : {}) }}
                  aria-required="true" aria-invalid={!!errors.hectareas}
                  {...register('hectareas', { required: 'Requerido', min: { value: 1, message: 'Mínimo 1' } })}
                />
                {errors.hectareas && <p role="alert" className="text-xs mt-1" style={{ color: '#dc2626' }}>{errors.hectareas.message}</p>}
              </div>

              <div>
                <label htmlFor="mensaje" className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-lt)' }}>
                  Mensaje
                </label>
                <textarea id="mensaje" rows={3}
                  className={`${inputCls} resize-none`}
                  style={{ ...inputStyle, minHeight: 'auto' }}
                  placeholder="Tipo de plaga, fecha preferida, detalles…"
                  {...register('mensaje')}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-neon justify-center w-full"
                style={{ opacity: status === 'loading' ? .7 : 1, cursor: status === 'loading' ? 'not-allowed' : 'pointer' }}
              >
                {status === 'loading'
                  ? <><svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="10" strokeOpacity=".25"/><path d="M12 2a10 10 0 0110 10"/></svg>Enviando…</>
                  : 'Agenda tu demo gratuita'
                }
              </button>

              {status === 'success' && (
                <p role="status" className="text-sm text-center p-3 rounded-lg font-medium"
                  style={{ backgroundColor: 'rgba(0,204,53,0.1)', color: 'var(--neon-lt)', border: '1px solid rgba(0,204,53,0.2)' }}>
                  ¡Solicitud enviada! Te respondemos en menos de 24 h.
                </p>
              )}
              {status === 'error' && (
                <p role="alert" className="text-sm text-center p-3 rounded-lg"
                  style={{ backgroundColor: 'rgba(220,38,38,0.08)', color: '#dc2626' }}>
                  Hubo un problema. Intentá de nuevo o contactanos por WhatsApp.
                </p>
              )}

              <p className="text-xs text-center" style={{ color: 'var(--text-lt)' }}>
                Sin compromiso · Respuesta en menos de 24 h
              </p>
            </form>
          </RevealWrapper>
        </div>
      </div>
    </section>
  );
}

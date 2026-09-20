import { portfolioContent } from '../content';

export function SkillsSection() {
  const { skills } = portfolioContent;

  return (
    <section
      id="skills"
      className="py-20 px-6 sm:px-8 max-w-7xl mx-auto border-t border-stone-200/80 scroll-mt-20"
    >
      {/* Header */}
      <div className="max-w-2xl mb-12">
        <span className="font-mono text-xs uppercase tracking-widest text-stone-600 block mb-2">
          Toolkit & Competencies
        </span>
        <h2 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl text-stone-900 font-normal tracking-tight mb-4">
          Product Skills
        </h2>
        <p className="text-sm sm:text-base text-stone-600 font-sans-editorial">
          A blend of strategic thinking, user discovery frameworks, analytical skills, and cross-functional execution tools.
        </p>
      </div>

      {/* Grid of Skill Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skills.map((skillGroup, idx) => (
          <div
            key={idx}
            id={`skill-category-${idx}`}
            className="p-6 rounded-2xl bg-white border border-stone-200 hover:border-stone-300 transition-colors flex flex-col justify-between"
          >
            <div>
              {/* Category Header */}
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-stone-100">
                <span className="font-mono text-xs text-stone-600 font-semibold">
                  0{idx + 1}
                </span>
                <h3 className="font-medium text-sm text-stone-900 tracking-tight">
                  {skillGroup.category}
                </h3>
              </div>

              {/* Skills List as Clean Tags */}
              <ul className="space-y-2">
                {skillGroup.items.map((item, itemIdx) => (
                  <li
                    key={itemIdx}
                    className="text-xs sm:text-sm text-stone-600 flex items-center gap-2 font-sans-editorial"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-300 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-3 border-t border-stone-100/60 text-[11px] font-mono text-stone-600">
              {skillGroup.items.length} competencies
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

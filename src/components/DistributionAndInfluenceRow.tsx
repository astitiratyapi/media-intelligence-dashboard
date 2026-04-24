import { tokens } from '../tokens'
import { MediaInfluenceSection, type MediaInfluenceSectionProps } from './MediaInfluenceSection'
import { DataDistributionSection, type DataDistributionSectionProps } from './DataDistributionSection'

export interface DistributionAndInfluenceRowProps {
  mediaInfluence: MediaInfluenceSectionProps
  dataDistribution: DataDistributionSectionProps
}

export function DistributionAndInfluenceRow({ mediaInfluence, dataDistribution }: DistributionAndInfluenceRowProps) {
  return (
    <div
      className="flex flex-row items-stretch w-full"
      style={{ gap: tokens.spacing.default }}
    >
      <MediaInfluenceSection {...mediaInfluence} />
      <DataDistributionSection {...dataDistribution} />
    </div>
  )
}

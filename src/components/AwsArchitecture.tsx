import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Cloud,
  GitBranch,
  ShieldCheck,
  Zap,
  Globe2,
  Server,
  Lock,
  ArrowRight,
  Terminal,
  ExternalLink,
  CheckCircle2,
  Cpu,
} from 'lucide-react'
import { sound } from '../utils/audio'

interface AwsArchitectureProps {
  onOpenTerminal: () => void
}

export function AwsArchitecture({ onOpenTerminal }: AwsArchitectureProps) {
  const [selectedService, setSelectedService] = useState<string>('amplify')

  const awsServices = [
    {
      id: 'amplify',
      name: 'AWS Amplify Hosting',
      role: 'Git-connected build and static hosting',
      icon: Cloud,
      color: '#FF9900',
      description:
        'AWS Amplify Hosting can connect this repository to a managed build and deployment workflow. The included amplify.yml publishes the Vite dist directory.',
      highlights: [
        'GitHub-connected build workflow',
        'Static artifact publishing from dist',
        'SPA-friendly hosting configuration',
      ],
      configSnippet: `version: 1\nfrontend:\n  phases:\n    preBuild:\n      commands:\n        - npm ci\n    build:\n      commands:\n        - npm run build\n  artifacts:\n    baseDirectory: dist\n    files:\n      - '**/*'`,
    },
    {
      id: 'cloudfront',
      name: 'Amazon CloudFront CDN',
      role: 'Optional edge caching layer',
      icon: Globe2,
      color: '#38bdf8',
      description:
        'CloudFront is the edge delivery layer associated with Amplify Hosting. It can cache static assets close to visitors; real performance should be measured after deployment.',
      highlights: [
        'Global edge caching for static assets',
        'Managed HTTPS through the hosting platform',
        'A natural place to inspect cache behavior after launch',
      ],
      configSnippet: `# CloudFront Edge Optimization\nCache-Control: public, max-age=31536000, immutable\nContent-Encoding: br, gzip\nStrict-Transport-Security: max-age=63072000`,
    },
    {
      id: 's3',
      name: 'Amazon S3 Origin',
      role: 'Static asset origin',
      icon: Server,
      color: '#34d399',
      description:
        'The production bundle can be backed by S3-style object storage through the managed hosting architecture. This project does not create or manage a bucket directly.',
      highlights: [
        'Object storage for static build artifacts',
        'A durable foundation for hashed assets',
        'No application data or credentials stored in this repository',
      ],
      configSnippet: `{\n  "Version": "2012-10-17",\n  "Statement": [{\n    "Sid": "EnforceHttpsOnly",\n    "Effect": "Deny",\n    "Principal": "*",\n    "Action": "s3:*",\n    "Condition": { "Bool": { "aws:SecureTransport": "false" } }\n  }]\n}`,
    },
    {
      id: 'iam',
      name: 'AWS IAM & Security',
      role: 'Security considerations',
      icon: Lock,
      color: '#a855f7',
      description:
        'The repository contains no AWS credentials or secrets. Amplify-managed roles and least-privilege policies should be reviewed in the AWS console after connecting the repository.',
      highlights: [
        'No secret credentials in the public repository',
        'Review deployment roles before launch',
        'Enable additional logging only when needed',
      ],
      configSnippet: `# IAM Least-Privilege Role\nRole: AWSAmplifyServiceRole\nPolicies:\n  - CloudWatchLogsFullAccess\n  - S3ReadWriteBucketScoped`,
    },
  ]

  const active = awsServices.find((s) => s.id === selectedService) || awsServices[0]

  return (
    <section id="aws-architecture" className="page-width aws-section">
      <div className="section-label">04 / AWS Cloud Architecture</div>

      <div className="section-heading mb-8">
        <p className="eyebrow">
          <span />
          Infrastructure Tour
        </p>
        <h2>
          A thoughtful path to
          <br />
          <span>AWS deployment.</span>
        </h2>
        <p className="section-copy">
        A transparent tour of how this static portfolio is prepared for AWS Amplify Hosting: managed builds, static artifacts, edge delivery, and an explicit security review before launch.
        </p>
      </div>

      {/* Visual Pipeline Diagram */}
      <div className="aws-pipeline-card">
        <div className="pipeline-header">
          <div className="flex items-center gap-2">
            <span className="pipeline-dot" />
            <span className="font-mono text-xs text-amber-400 font-semibold uppercase tracking-wider">
              Continuous Deployment Pipeline
            </span>
          </div>
          <span className="text-[11px] text-neutral-400 font-mono">
            AWS Amplify Engine
          </span>
        </div>

        <div className="pipeline-flow">
          <div className="flow-step">
            <div className="flow-icon bg-neutral-800 text-neutral-200">
              <GitBranch size={18} />
            </div>
            <strong>Git Push</strong>
            <span>main branch</span>
          </div>

          <div className="flow-arrow">
            <ArrowRight size={18} className="text-amber-400 animate-pulse" />
          </div>

          <div className="flow-step">
            <div className="flow-icon bg-amber-500/20 text-amber-400 border border-amber-500/40">
              <Cloud size={18} />
            </div>
            <strong>Amplify CI/CD</strong>
            <span>npm ci &amp; build</span>
          </div>

          <div className="flow-arrow">
            <ArrowRight size={18} className="text-amber-400 animate-pulse" />
          </div>

          <div className="flow-step">
            <div className="flow-icon bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              <Server size={18} />
            </div>
            <strong>Amazon S3</strong>
            <span>SPA origin storage</span>
          </div>

          <div className="flow-arrow">
            <ArrowRight size={18} className="text-amber-400 animate-pulse" />
          </div>

          <div className="flow-step">
            <div className="flow-icon bg-sky-500/20 text-sky-400 border border-sky-500/40">
              <Globe2 size={18} />
            </div>
            <strong>CloudFront Edge</strong>
            <span>Global edge delivery</span>
          </div>
        </div>

        {/* Deployment readiness indicators */}
        <div className="pipeline-status-row">
          <div className="status-item">
            <span className="status-indicator-green" />
            <span>Amplify Hosting: <strong>Configured</strong></span>
          </div>
          <div className="status-item">
            <span className="status-indicator-green" />
            <span>SSL Certificate: <strong>Managed after launch</strong></span>
          </div>
          <div className="status-item">
            <span className="status-indicator-green" />
            <span>Performance: <strong>Measure after launch</strong></span>
          </div>
        </div>
      </div>

      {/* Interactive Service Inspector */}
      <div className="aws-inspector-grid">
        <div className="aws-services-selector">
          <h3 className="font-mono text-xs text-neutral-400 uppercase tracking-wider mb-3">
            Core AWS Building Blocks
          </h3>

          <div className="space-y-2">
            {awsServices.map((service) => {
              const Icon = service.icon
              const isSelected = service.id === selectedService
              return (
                <button
                  key={service.id}
                  onClick={() => {
                    sound.playPop()
                    setSelectedService(service.id)
                  }}
                  className={`service-select-btn ${isSelected ? 'active' : ''}`}
                >
                  <div
                    className="service-icon-box"
                    style={{
                      color: service.color,
                      backgroundColor: `${service.color}15`,
                      borderColor: `${service.color}40`,
                    }}
                  >
                    <Icon size={16} />
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <strong className="block text-xs text-white truncate">
                      {service.name}
                    </strong>
                    <span className="text-[10px] text-neutral-400 truncate block">
                      {service.role}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Inspector Detail Card */}
        <div className="aws-inspector-display">
          <div className="inspector-card-header">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400">
                Service Specification
              </span>
              <h3 className="text-lg font-bold text-white mt-0.5">{active.name}</h3>
            </div>
            <span className="text-xs px-2.5 py-1 bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded font-mono">
              Reference architecture
            </span>
          </div>

          <p className="text-xs text-neutral-300 leading-relaxed mb-4">
            {active.description}
          </p>

          <div className="mb-4">
            <strong className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-2">
              Architectural Highlights
            </strong>
            <ul className="space-y-1.5">
              {active.highlights.map((item) => (
                <li key={item} className="text-xs text-neutral-300 flex items-start gap-2">
                  <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="inspector-code-block">
            <div className="code-block-header">
              <span className="font-mono text-[10px] text-neutral-400">
                configuration / manifest
              </span>
            </div>
            <pre className="code-block-content">
              <code>{active.configSnippet}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}

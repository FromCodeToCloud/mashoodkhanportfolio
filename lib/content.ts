// All site copy lives here so you can edit content without touching layout.

export type Link = { label: string; href: string };
export type Stat = { value: string; label: string };
export type Job = {
  period: string;
  company: string;
  title: string;
  points: string[];
  stack: string[];
};
export type Project = {
  name: string;
  kind: string;
  blurb: string;
  stack: string[];
  href?: string;
};
export type SkillGroup = { group: string; items: string[] };

export const profile = {
  name: "Mashood",
  role: "Platform Engineer",
  location: "Hyderabad, India",
  tagline:
    "I build the paved roads developers ship on: self-service platforms, Kubernetes, and infrastructure as code on AWS.",
  status: "IT Analyst @ TCS · building a Database-as-a-Service IDP",
  links: [
    { label: "X / @fromcodetocloud", href: "https://x.com/fromcodetocloud" },
    { label: "fromcodetocloud.com", href: "https://fromcodetocloud.com" },
  ] satisfies Link[],
};

export const stats: Stat[] = [
  { value: "5 yrs", label: "shipping software" },
  { value: "14K", label: "followers on X" },
  { value: "3", label: "DB engines on one IDP" },
];

export const experience: Job[] = [
  {
    period: "2026 — now",
    company: "Tata Consultancy Services",
    title: "IT Analyst · Platform Engineering",
    points: [
      "Backend engineer on an Internal Developer Platform that gives teams self-service databases on AWS for a AAA gaming client.",
      "Go + Gin APIs backed by Temporal workflows, activities and workers so provisioning survives partial failures.",
      "Request → generated Terraform committed to a forked GitLab repo → pipeline plan/apply → RDS cluster live.",
      "Each engine (RDS, Cassandra, Yugabyte) runs as its own workflow microservice on Kubernetes.",
    ],
    stack: ["Go", "Gin", "Temporal", "Terraform", "GitLab CI", "AWS RDS", "Kubernetes", "Backstage"],
  },
  {
    period: "~4 yrs",
    company: "ZerocodeHR",
    title: "Senior Software Engineer",
    points: [
      "Automated build, release and environment workflows for an HR SaaS product, replacing manual steps with repeatable scripts and pipelines.",
      "Built and maintained CI/CD pipelines in Jenkins so every change was built, checked and shipped the same way.",
      "Containerized services with Docker and scripted day-to-day operations in Python.",
    ],
    stack: ["Python", "Jenkins", "CI/CD", "Docker", "Linux", "Git"],
  },
];

export const projects: Project[] = [
  {
    name: "CertPilot",
    kind: "SaaS · in progress",
    blurb:
      "Certificate health monitoring built for Kubernetes. Finds every TLS cert across clusters and ingresses and warns you before one expires and takes production down with it.",
    stack: ["Kubernetes", "TLS", "Alerting", "Dodo Payments"],
  },
  {
    name: "fromcodetocloud",
    kind: "Content brand · 14K on X",
    blurb:
      "DevOps, cloud and platform engineering explained visually. Animated explainers on canary deploys, multi-stage Docker builds and CI/CD flows, plus practical guides on Gumroad.",
    stack: ["Animated explainers", "Guides", "X", "Instagram"],
    href: "https://x.com/fromcodetocloud",
  },
  {
    name: "HR App on Kubernetes",
    kind: "Reference build",
    blurb:
      "React + Express + Postgres employee directory, taken from Dockerfiles to a hardened cluster: StatefulSet Postgres, HPA on both tiers, NGINX ingress and network policies isolating each tier.",
    stack: ["React", "Express", "Postgres", "HPA", "NetworkPolicy", "Ingress"],
  },
  {
    name: "TaskFlow: AWS 3-Tier",
    kind: "PDF guide",
    blurb:
      "A step-by-step guide to designing and deploying a classic three-tier architecture on AWS, from VPC and subnets to load balancing and RDS.",
    stack: ["AWS", "VPC", "ALB", "RDS"],
  },
];

export const skills: SkillGroup[] = [
  { group: "Cloud", items: ["AWS (EKS, ECS/Fargate, RDS, VPC, IAM, S3, Route53)", "Azure", "GCP"] },
  { group: "Platform", items: ["Kubernetes", "Helm", "Crossplane", "Backstage", "Temporal"] },
  { group: "IaC & GitOps", items: ["Terraform", "Ansible", "ArgoCD", "Flux"] },
  { group: "CI/CD", items: ["Jenkins", "GitHub Actions", "GitLab CI"] },
  { group: "Observability", items: ["Prometheus", "Grafana", "CloudWatch", "EFK"] },
  { group: "Security", items: ["Trivy", "SonarQube", "Vault", "OPA", "Kyverno", "Checkov"] },
  { group: "Code", items: ["Go", "Python / Boto3", "Bash"] },
];

export const pipeline: string[] = ["commit", "build", "scan", "plan", "apply", "live"];

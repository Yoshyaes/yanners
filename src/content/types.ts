export interface WorkItem {
  title: string;
  tag: string;
  href: string | null;
  blurb: string;
  coverFrom: string;
  coverTo: string;
  comingSoon: boolean;
}

export interface VideoItem {
  label: string;
  embedSrc: string;
  fallbackHref: string;
}

export interface PostSummary {
  slug: string;
  title: string;
}

export interface PostByYear {
  year: string;
  posts: PostSummary[];
}

export function groupPostsByYear(
  posts: { slug: string; title: string; date: string }[]
): PostByYear[] {
  const byYear = new Map<string, PostSummary[]>();

  for (const post of posts) {
    const year = post.date.split("-")[0];
    if (!byYear.has(year)) {
      byYear.set(year, []);
    }
    byYear.get(year)!.push({ slug: post.slug, title: post.title });
  }

  return Array.from(byYear.entries())
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(([year, posts]) => ({ year, posts }));
}

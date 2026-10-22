import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useReveal from "../hooks/useReveal.js";
import { posts } from "../data/content.js";

function Article({ post }) {
  const ref = useReveal();
  const [copied, setCopied] = useState(false);
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 2);
  const copy = () => { navigator.clipboard?.writeText(location.href); setCopied(true); setTimeout(() => setCopied(false), 1800); };
  return (
    <article ref={ref} className="section narrow post-page">
      <Link to="/blog" className="back">← All posts</Link>
      <small className="meta">{post.tag} · {post.date} · {post.read} min read</small>
      <h1>{post.title}</h1>
      <p className="lead">{post.text}</p>
      <div className="thumb big" />
      <div className="prose">{post.body.map((p, i) => <p key={i} data-reveal>{p}</p>)}</div>
      <button className="btn btn-ghost" onClick={copy}>{copied ? "Link copied ✓" : "Share this post"}</button>
      <h3 className="rel">Keep reading</h3>
      <div className="grid g2">{related.map((x) => <Link to={"/blog/" + x.slug} className="card post" key={x.slug}><small>{x.tag}</small><h3>{x.title}</h3><p>{x.text}</p></Link>)}</div>
    </article>
  );
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return <section className="section page-hero"><h1>Post not found</h1><Link to="/blog" className="btn">Back to blog</Link></section>;
  return <Article key={slug} post={post} />;
}

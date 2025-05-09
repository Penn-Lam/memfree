// @ts-nocheck

import { formatDate } from '@/lib/utils';
import { siteConfig } from '@/config';
import { StepList } from '@/components/content/step-list';
import Link from 'next/link';
import { getChangelogData } from '@/lib/db';

export const metadata = {
    title: 'MemFree Changelog -- Hybrid AI Search',
    description: 'MemFree Changelog -- Hybrid AI Search',
    alternates: {
        canonical: siteConfig.url + '/changelog',
    },
};

export const dynamic = 'force-static';
export default async function Changelog() {
    const data = await getChangelogData();
    return (
        <div className="min-h-screen">
            <div className="py-10 max-w-4xl mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-2xl sm:text-3xl font-bold">MemFree Changelog</h1>
                    <h2 className="text-muted-foreground pt-6 font-bold">
                        MemFree is committed to becoming the <strong>ultimate AI assistant</strong> for <strong>Indie Makers</strong> and{' '}
                        <strong>Full-Stack Developers</strong>. Our vision is to boost product development efficiency by <strong>10x</strong> through
                        cutting-edge AI technology.
                    </h2>
                    <h2 className="text-muted-foreground pt-6 font-bold">
                        Currently, MemFree offers five core features: <strong>AI Search</strong>, <strong>AI Chatbot</strong>, <strong>AI UI generator</strong>,{' '}
                        <strong>AI Image generator</strong>, and <strong>AI Coding Assistant</strong>.
                    </h2>
                    <h2 className="text-muted-foreground pt-6 font-bold">
                        Moving forward, we will continue to enhance our <strong>AI Search</strong> and <strong>AI Coding</strong> capabilities, providing
                        developers with smarter and more efficient solutions to seamlessly transform ideas into products.
                    </h2>

                    <p className="text-muted-foreground font-bold py-6">
                        This ChangeLog Page is generated by{' '}
                        <Link href="https://pagegen.ai/" target="_blank" className="text-blue-400 hover:text-blue-600 transition-colors ml-1">
                            PageGen
                        </Link>
                    </p>
                    <div className="relative">
                        <div className="absolute left-24 top-0 bottom-0 w-0.5 bg-muted hidden sm:block" />

                        <div className="space-y-8 sm:space-y-12">
                            {data?.changelog?.map((release, index) => {
                                const date = formatDate(release.date);
                                return (
                                    <div key={index} className="relative">
                                        <div className="flex flex-col sm:block">
                                            <div className="hidden sm:block">
                                                <div className="absolute right-full mr-[-4rem] top-0 text-right">
                                                    <div className="font-bold text-sm">{date}</div>
                                                </div>
                                                <div className="absolute left-24 -translate-x-1/2">
                                                    <div className="w-4 h-4 bg-primary rounded-full border-4 shadow" />
                                                </div>
                                            </div>

                                            <div className="sm:ml-36">
                                                <div className="duration-200 overflow-hidden">
                                                    <div className="mb-2 sm:hidden font-bold text-primary ">{date}</div>

                                                    <div className="relative w-full rounded-md overflow-hidden">
                                                        {release.image?.link ? (
                                                            <Link href={release.image.link} target="_blank">
                                                                <img
                                                                    src={release.image.src}
                                                                    alt={`Update ${release.version}`}
                                                                    className="w-full h-full object-contain cursor-pointer hover:opacity-80 transition-opacity"
                                                                />
                                                            </Link>
                                                        ) : (
                                                            <img
                                                                src={release.image?.src}
                                                                alt={`Update ${release.version}`}
                                                                className="w-full h-full object-contain"
                                                            />
                                                        )}
                                                    </div>

                                                    {/* Header */}
                                                    <div className="p-4 sm:p-6">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <h2 className="text-lg sm:text-xl font-semibold">{release.version}</h2>
                                                        </div>
                                                        {release.summary && <p className="text-gray-600">{release.summary}</p>}
                                                    </div>

                                                    {/* Content */}
                                                    <div className="p-4 sm:p-6">
                                                        <div className="space-y-6">
                                                            {release.changes.map((change, changeIndex) => (
                                                                <div key={changeIndex}>
                                                                    <div className="flex items-center space-x-2 mb-6">
                                                                        <span
                                                                            className={`inline-flex items-center px-4 py-1 rounded-full font-medium capitalize bg-blue-100 text-blue-800`}
                                                                        >
                                                                            {change.type}
                                                                        </span>
                                                                    </div>
                                                                    {change.stepItems ? (
                                                                        <StepList steps={change.stepItems} />
                                                                    ) : (
                                                                        <ul className="space-y-2 text-gray-600 ml-4">
                                                                            {change.items.map((item, itemIndex) => (
                                                                                <li key={itemIndex} className=" flex items-start">
                                                                                    <span className="mr-2">•</span>
                                                                                    {item.link ? (
                                                                                        <Link
                                                                                            href={item.link}
                                                                                            target="_blank"
                                                                                            className="text-primary hover:underline"
                                                                                        >
                                                                                            {item.text}
                                                                                        </Link>
                                                                                    ) : (
                                                                                        <span>{item.text}</span>
                                                                                    )}
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

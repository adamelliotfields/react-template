import { type AnchorHTMLAttributes, type PropsWithChildren } from 'react'

export default function Lipsum() {
  // decent amount of content to push the page down
  return (
    <div className="prose prose-neutral dark:prose-invert">
      <h3>
        <em>What is Lorem Ipsum?</em>
      </h3>
      <p>
        According to <Link href="https://www.lipsum.com">lipsum.com</Link>,{' '}
        <em>Lorem Ipsum</em> is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever since the
        1500s, when an unknown printer took a galley of type and scrambled it to make a
        type specimen book. It has survived not only five centuries, but also the leap
        into electronic typesetting, remaining essentially unchanged. It was popularised
        in the 1960s with the release of Letraset sheets containing Lorem Ipsum
        passages, and more recently with desktop publishing software like Aldus
        PageMaker including versions of Lorem Ipsum.
      </p>
      <h3>
        <em>Where does it come from?</em>
      </h3>
      <p>
        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots
        in a piece of classical Latin literature from 45 BC, making it over 2000 years
        old. Richard McClintock, a Latin professor at Hampden-Sydney College in
        Virginia, looked up one of the more obscure Latin words, consectetur, from a
        Lorem Ipsum passage, and going through the cites of the word in classical
        literature, discovered the undoubtable source. Lorem Ipsum comes from sections
        1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and
        Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of
        ethics, very popular during the Renaissance. The first line of Lorem Ipsum,
        "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
      </p>
      <p>
        The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for
        those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et
        Malorum" by Cicero are also reproduced in their exact original form, accompanied
        by English versions from the 1914 translation by H. Rackham.
      </p>
      <h3>
        <em>Why do we use it?</em>
      </h3>
      <p>
        It is a long established fact that a reader will be distracted by the readable
        content of a page when looking at its layout. The point of using Lorem Ipsum is
        that it has a more-or-less normal distribution of letters, as opposed to using
        'Content here, content here', making it look like readable English. Many desktop
        publishing packages and web page editors now use Lorem Ipsum as their default
        model text, and a search for 'lorem ipsum' will uncover many web sites still in
        their infancy. Various versions have evolved over the years, sometimes by
        accident, sometimes on purpose (injected humour and the like).
      </p>
      <h3>
        <em>Where can I get some?</em>
      </h3>
      <p>
        There are many variations of passages of Lorem Ipsum available, but the majority
        have suffered alteration in some form, by injected humour, or randomised words
        which don't look even slightly believable. If you are going to use a passage of
        Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the
        middle of text. All the Lorem Ipsum generators on the Internet tend to repeat
        predefined chunks as necessary, making this the first true generator on the
        Internet. It uses a dictionary of over 200 Latin words, combined with a handful
        of model sentence structures, to generate Lorem Ipsum which looks reasonable.
        The generated Lorem Ipsum is therefore always free from repetition, injected
        humour, or non-characteristic words etc.
      </p>
      <h3>The standard Lorem Ipsum passage, used since the 1500s:</h3>
      <blockquote>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
          nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
          eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
          in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </blockquote>
    </div>
  )
}

function Link({
  children,
  href
}: PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>>) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

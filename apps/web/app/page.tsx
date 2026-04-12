import Image, { type ImageProps } from "next/image";
import styles from "./page.module.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" />
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  );
};

export default function Home() {
  return (
    <div className={styles.page}>
      <ThemeImage
        className={styles.logo}
        srcLight="turborepo-dark.svg"
        srcDark="turborepo-light.svg"
        alt="Turborepo logo"
        width={180}
        height={38}
        priority
      />

      <Card>
        <Input type="text" placeholder="Enter your name" />

        <Button>
          Open alert
        </Button>

      </Card>
    </div>
  );
}

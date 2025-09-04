import { Loader } from '@/components/ui/loader';

export function FullPageLoader() {
  return (
    <div className='z-[50] flex h-screen w-screen items-center justify-center'>
      <Loader />
    </div>
  );
}

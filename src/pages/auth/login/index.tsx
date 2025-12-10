import { Link, Navigate } from 'react-router-dom';

// Features
import LoginForm from '@/features/auth/components/LoginForm';

// Components
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// Libs
import { cn } from '@/lib/utils';

// Utils
import facebookIcon from '@/assets/images/facebook.png';
import linkedinIcon from '@/assets/images/linkedin.png';
import loginBg from '@/assets/images/login-bg.jpg';
import logo from '@/assets/images/lstv-icon.png';
import websiteIcon from '@/assets/images/web-link.png';

// Stores
import { useAuthStore } from '@/stores/useAuthStore';

const LoginPage = () => {
    const { user, isSupervisor, accessibleRoutes } = useAuthStore();

    if (user) {
        const redirecTo = isSupervisor ? '/dashboard' : accessibleRoutes[0] ?? '/404';

        return (
            <Navigate 
                to={redirecTo} 
                replace 
            />
        );
    }

    const links = [
        {
            img: facebookIcon,
            href: 'https://www.facebook.com/LeeSystemsTechnologyVentures',
            alt: 'facebook logo',
        },
        {
            img: linkedinIcon,
            href: 'https://ph.linkedin.com/company/lee-systems-technology-ventures',
            alt: 'linkedin logo',
        },
        {
            img: websiteIcon,
            href: 'https://lstventures.com/',
            alt: 'website link',
        }
    ];

    return (
        <main>
            <div 
                className="flex flex-col items-center justify-center bg-cover bg-center px-4 min-h-screen py-20"
                style={{ backgroundImage: `url(${loginBg})` }}
            >
                <div className='absolute top-0 left-0 w-full h-full bg-slate-800/25 backdrop-blur-lg' />
                <Card className='backdrop-blur-none grid md:grid-cols-2 max-[400px]:w-full z-10 relative'>
                    <div className='w-full min-[400px]:w-[368px] px-10 py-5'>
                        <h1 className="relative z-10 text-3xl font-semibold mb-10 text-center flex items-center justify-center gap-2">
                            <img src={logo} alt="logo" className='w-8 h-8 md:hidden' />
                            HR Connect
                        </h1>
                        <LoginForm />
                        <Link 
                            to="/forgot-password" 
                            className='hover:underline block mx-auto mt-4 w-fit text-sm'
                        >
                            Forgot Password?
                        </Link>
                    </div>
                    <div 
                        className={cn(
                            'h-full w-[368px] py-5 rounded-tr-md rounded-br-md overflow-hidden',
                            'bg-[#3c512b] text-primary-foreground bg-center bg-cover bg-no-repeat',
                            'relative hidden md:block',
                        )}
                        style={{ backgroundImage: `url(${loginBg})` }}
                    >
                        <div className='absolute inset-0 bg-primary/50 backdrop-blur-sm'/>
                        <div className='text-white relative z-10 px-10 flex flex-col justify-between h-full'>
                            <div>
                                <h2 className='text-3xl font-semibold text-center mb-10'> 
                                    Welcome back 
                                </h2>
                                <p className='text-center'>
                                    Simplify HR processes with ease—manage employee records, automate payroll, monitor attendance, and stay compliant. 
                                    HR Connect enhances productivity, empowers employees, and delivers the insights you need to lead with confidence.
                                </p>
                            </div>
                            <div className='flex flex-col items-center gap-3'>
                                <div className='flex items-center justify-center gap-2'>
                                    {links.map((item) => (
                                        <Button key={item.href} size='icon' className='rounded-full bg-sidebar-primary-foreground hover:bg-primary-foreground/90 shadow-md' asChild>
                                            <Link to={item.href} target='_blank'>
                                                <img src={item.img} alt={item.alt} className='w-4 h-4' />
                                            </Link>
                                        </Button>
                                    ))}
                                </div>
                                <p> Developed by <span className='font-bold'>LSTV</span> </p>
                            </div>
                        </div>
                    </div>
                    <div className='absolute top-0 left-1/2 -translate-x-1/2 bg-white p-4 rounded-full ring ring-primary mt-[-32px] hidden md:block'>
                        <img src={logo} alt="logo" className='w-8 h-8' />
                    </div>
                </Card>
            </div>
        </main>
    );
};

export default LoginPage;
<template>
	<Page xmlns:Card="nativescript-cardview" loaded="pageLoaded" actionBarHidden="true">
        <Gradient direction="to right" colors="#B2DB34, #28A352, #397d54">
        <ScrollView orientation="vertical">
		<FlexboxLayout class="page">
            <card-view margin="0" ripple="90" radius="1">
			<StackLayout class="form">
                <Image class="logo" src="https://siamik.upnjatim.ac.id/images/logo.jpg"/>
               <!-- <Image class="logo" src="~/images/logo.png" /> -->
				<Label class="header" text="Siamik Login" />

				<StackLayout v-show="isLoggingIn" class="input-field" marginBottom="25">
					<TextField class="input" hint="NPM Anda" autocorrect="false" autocapitalizationType="none"
					 returnKeyType="next" @returnPress="focusPassword" fontSize="18" />
					<StackLayout class="hr-light" />
				</StackLayout>

				<StackLayout v-show="isLoggingIn" class="input-field" marginBottom="25">
					<TextField ref="password" class="input" hint="Password Anda" secure="true" :returnKeyType="isLoggingIn ? 'done' : 'next'"
					 @returnPress="focusConfirmPassword" fontSize="18" />
					<StackLayout class="hr-light" />
				</StackLayout>

                <StackLayout v-show="!isLoggingIn" class="input-field" marginBottom="25">
					<TextField class="input" hint="Email" keyboardType="email" autocorrect="false" autocapitalizationType="none" 
					 returnKeyType="next" @returnPress="focusPassword" fontSize="18" />
					<StackLayout class="hr-light" />
				</StackLayout>

				<StackLayout v-show="!isLoggingIn" class="input-field" marginBottom="25">
					<TextField ref="password" class="input" hint="Password" secure="true"  :returnKeyType="isLoggingIn ? 'done' : 'next'"
					 @returnPress="focusConfirmPassword" fontSize="18" />
					<StackLayout class="hr-light" />
				</StackLayout>

				<StackLayout v-show="!isLoggingIn" class="input-field">
					<TextField ref="confirmPassword" class="input" hint="Confirm password" secure="true" returnKeyType="done"
					 fontSize="18" />
					<StackLayout class="hr-light" />
				</StackLayout>

				<Button :text="isLoggingIn ? 'Log In' : 'Sign Up'" @tap="$goto('page1')" class="btn btn-primary m-t-20" />
				<Label v-show="isLoggingIn" text="Lupa password kamu? " class="login-label" @tap="forgotPassword" />
                <!--<Label class="login-label sign-up-label" @tap="toggleForm">
	          <FormattedString>
	            <Span :text="isLoggingIn ? 'Belum mempunyai akun? ' : 'Back to Login'" />
	            <Span :text="isLoggingIn ? 'Daftar Baru' : ''" class="bold" />
	          </FormattedString> -->
	        </Label>
            </StackLayout>
            </card-view>
			
            
		</FlexboxLayout>
        </ScrollView>
        </Gradient>
	</Page>
</template>

<script>
// A stub for a service that authenticates users.
const userService = {
    register(user) {
        return Promise.resolve(user);
    },
    login(user) {
        return Promise.resolve(user);
    },
    resetPassword(email) {
        return Promise.resolve(email);
    }
};

// A stub for the main page of your app. In a real app you’d put this page in its own .vue file.
const HomePage = {
    template: `
<Page>
	<Label class="m-20" textWrap="true" text="Ini adalah halaman dimana tempat landing setelah login."></Label>
</Page>
`
};

export default {
    data() {
        return {
            isLoggingIn: true,
            user: {
                email: "afrizal@afrizal.web.id",
                password: "foo",
                confirmPassword: "foo"
            }
        };
    },
    methods: {
        toggleForm() {
            this.isLoggingIn = !this.isLoggingIn;
        },

        submit() {
            if (!this.user.email || !this.user.password) {
                this.alert(
                    "Please provide both an email address and password."
                );
                return;
            }
            if (this.isLoggingIn) {
                this.login();
            } else {
                this.register();
            }
        },

        login() {
            userService
                .login(this.user)
                .then(() => {
                    this.$navigateTo(HomePage);
                })
                .catch(() => {
                    this.alert("Unfortunately we could not find your account.");
                });
        },

        register() {
            if (this.user.password != this.user.confirmPassword) {
                this.alert("Your passwords do not match.");
                return;
            }

            userService
                .register(this.user)
                .then(() => {
                    this.alert("Your account was successfully created.");
                    this.isLoggingIn = true;
                })
                .catch(() => {
                    this.alert(
                        "Unfortunately we were unable to create your account."
                    );
                });
        },

        forgotPassword() {
            this.alert(
                    "Segera hubungi bagian Biro Akademik di Gedung BAKPK"
                );
        },

        focusPassword() {
            this.$refs.password.nativeView.focus();
        },
        focusConfirmPassword() {
            if (!this.isLoggingIn) {
                this.$refs.confirmPassword.nativeView.focus();
            }
        },

        alert(message) {
            return alert({
                title: "Siamik App",
                okButtonText: "OK",
                message: message
            });
        }
    }
};
</script>

<style scoped>
	.page {
		align-items: center;
        flex-direction: column;
        margin-top: 100dp 0;
        margin-bottom: 100dp 0;
        margin-left: 30;
		margin-right: 30;
        vertical-align: baseline;
	}

	.form {
		margin-left: 30;
		margin-right: 30;
		flex-grow: 2;
		vertical-align: middle;
	}

	.logo {
		margin-bottom: 12;
		height: 90;
		font-weight: bold;
	}

	.header {
		horizontal-align: center;
		font-size: 25;
		font-weight: 600;
		margin-bottom: 40;
		text-align: center;
		color: #6B8E4E;
	}

	.input-field {
		margin-bottom: 25;
	}

	.input {
		font-size: 18;
		placeholder-color: #A8A8A8;
	}

	.input-field .input {
		font-size: 54;
	}

	.btn-primary {
		height: 50;
		margin: 30 5 15 5;
		background-color: #B2393E;
		border-radius: 5;
		font-size: 20;
		font-weight: 600;
	}

	.login-label {
		horizontal-align: center;
		color: #A8A8A8;
		font-size: 16;
	}

	.sign-up-label {
		margin-bottom: 20;
	}

	.bold {
		color: #000000;
	}
</style>
